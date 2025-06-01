import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../../../../shared/ui/Button';
import { passwordValidationRules } from '../../../../shared/validation/passwordValidation';
import { FormPasswordInput } from '../../../../widgets/ui/inputs/FormPasswordInput';
import { PasswordChangeData } from '../../types/types';

export function PasswordChange() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordChangeData>({
    mode: 'onChange',
  });

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const onSubmit: SubmitHandler<PasswordChangeData> = (data) => {
    console.log(data);
  };

  return (
    <form className="change-password" onSubmit={handleSubmit(onSubmit)}>
      <div className="registration-field">
        <h2>Change Password</h2>

        <div className="form-group">
          <FormPasswordInput
            type="password"
            name="currentPassword"
            label="New password"
            id="current-password-input"
            placeholder="Password"
            register={register}
            errors={errors}
            rules={passwordValidationRules}
          />
        </div>

        <div className="form-group">
          <FormPasswordInput
            type="password"
            name="newPassword"
            label="New password"
            id="new-password-input"
            placeholder="Password"
            register={register}
            errors={errors}
            rules={passwordValidationRules}
          />
        </div>

        <div className="form-group">
          <FormPasswordInput
            type="password"
            name="confirmPassword"
            label="Confirm password"
            id="confirm-password-input"
            placeholder="Password"
            register={register}
            errors={errors}
            rules={passwordValidationRules}
          />
        </div>

        <Button type="submit">Change Password</Button>
      </div>
    </form>
  );
}
