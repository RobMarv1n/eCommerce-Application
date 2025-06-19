import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import {
  CreateAnonymousApiRoot,
  CreatePasswordApiRoot,
} from './CreateApiRoots';
import type { loginDTO, singUpDTO } from './types';
import { parseProfileData } from './parsers/parseProfileData';
import { createSignUpBody } from './utils/createSignUpBody';
import { parseCartData } from './parsers/parseCartData';
import { CartApi } from './subclasses/CartApi';
import { ProductApi } from './subclasses/ProductApi';
import { ProfileApi } from './subclasses/ProfileApi';

class ClientApi {
  public isLogin: boolean;
  public productApi: ProductApi;
  public cartApi: CartApi;
  public profileApi: ProfileApi;
  private apiRoot: ByProjectKeyRequestBuilder;

  constructor() {
    this.isLogin = false;
    this.apiRoot = CreateAnonymousApiRoot();

    this.productApi = new ProductApi(this.apiRoot);
    this.cartApi = new CartApi(this.apiRoot);
    this.profileApi = new ProfileApi(this.apiRoot);
  }

  public async login(dto: loginDTO): Promise<void> {
    const result = await this.apiRoot
      .me()
      .login()
      .post({
        body: { ...dto, activeCartSignInMode: 'MergeWithExistingCustomerCart' },
      })
      .execute();

    this.apiRoot = CreatePasswordApiRoot(dto);
    this.profileApi.profileData = parseProfileData(result.body.customer);
    const cart = await this.apiRoot.me().activeCart().get().execute();
    this.cartApi.cartData.id = cart.body.id;
    this.cartApi.cartData.version = cart.body.version;
    this.cartApi.cartData = parseCartData(cart.body);
  }

  public async logout(): Promise<void> {
    this.apiRoot = CreateAnonymousApiRoot();
    this.isLogin = false;
    const cart = await this.cartApi.createCart();
    this.cartApi.cartData.id = cart.id;
    this.cartApi.cartData.version = cart.version;
    this.cartApi.cartData.products = [];
  }

  public async signUp(dto: singUpDTO): Promise<void> {
    const body = createSignUpBody(dto);

    const result = await this.apiRoot
      .me()
      .signup()
      .post({
        body,
      })
      .execute();

    this.apiRoot = CreatePasswordApiRoot({
      email: dto.email,
      password: dto.password,
    });

    this.profileApi.profileData = parseProfileData(result.body.customer);
    const cart = await this.apiRoot.me().activeCart().get().execute();
    this.cartApi.cartData.id = cart.body.id;
    this.cartApi.cartData.version = cart.body.version;
  }
}

export const client = new ClientApi();
