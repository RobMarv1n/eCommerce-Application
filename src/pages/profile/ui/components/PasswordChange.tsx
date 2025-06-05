import { SubmitHandler, useForm } from 'react-hook-form';
import { client } from '../../../../shared/api/clientApi/ClientApi';
import { Button } from '../../../../shared/ui/Button';
import { passwordValidationRules } from '../../../../shared/validation/passwordValidation';
import { FormPasswordInput } from '../../../../widgets/ui/inputs/FormPasswordInput';
import { PasswordChangeData } from '../../types/types';

export function PasswordChange() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<PasswordChangeData>({
    mode: 'onChange',
  });

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const onSubmit: SubmitHandler<PasswordChangeData> = (data) => {
    client
      .updatePassword(data)
      .then(() => console.log('password changed successfully'))
      .catch(() => console.log('current password entered is incorrect'));
  };

  return (
    <form className="change-password" onSubmit={handleSubmit(onSubmit)}>
      <div className="registration-field">
        <h2 className="form-title">Change Password</h2>

        <div className="form-group password-input-container">
          <FormPasswordInput
            type="password"
            name="currentPassword"
            label="Current password"
            id="current-password-input"
            placeholder="Password"
            register={register}
            errors={errors}
            rules={{
              required: 'This field is required',
            }}
          />
        </div>

        <div className="form-group password-input-container">
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

        <div className="form-group password-input-container">
          <FormPasswordInput
            type="password"
            name="confirmPassword"
            label="Confirm password"
            id="confirm-password-input"
            placeholder="Password"
            register={register}
            errors={errors}
            rules={{
              required: 'This field is required',
              validate: (value: string) =>
                value === getValues('newPassword') || 'Passwords do not match',
            }}
          />
        </div>

        <Button type="submit">Change Password</Button>
      </div>
    </form>
  );
}
