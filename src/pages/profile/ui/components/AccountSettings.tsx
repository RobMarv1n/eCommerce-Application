import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { client } from '../../../../shared/api/clientApi/ClientApi';
import { Button } from '../../../../shared/ui/Button';
import { ageValidationRules } from '../../../../shared/validation/ageValidation';
import { emailValidationRules } from '../../../../shared/validation/emailValidation';
import { nameValidationRules } from '../../../../shared/validation/nameValidation';
import { FormInput } from '../../../../widgets/ui/inputs/FormInput';
import { AccountSettingsData } from '../../types/types';

export function AccountSettings() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountSettingsData>({
    mode: 'onChange',
    defaultValues: client.profileApi.profileData.accountSettingData,
  });

  const [isEditable, setIsEditable] = useState(false);

  const onSubmit: SubmitHandler<AccountSettingsData> = (data) => {
    client.profileApi
      .updateAccountSettingData(data)
      .then(() => console.log('data updated successfully'))
      .catch(() => console.log('data modification operation failed'));
  };

  const toggleEditable = () => {
    const hasNotErrors = Object.keys(errors).length === 0;

    if (!isEditable) {
      setIsEditable(true);
    } else if (isEditable && hasNotErrors) {
      setIsEditable(false);
    }
  };

  return (
    <form className="account-settings" onSubmit={handleSubmit(onSubmit)}>
      <div className="registration-field">
        <h2 className="form-title">Account Settings</h2>
        <div className="form-group">
          <FormInput
            name="email"
            label="Email"
            id="email-input"
            register={register}
            errors={errors}
            rules={emailValidationRules}
            disabled={!isEditable}
          />
        </div>

        <div className="form-group">
          <FormInput
            name="firstName"
            label="First name"
            id="first-name-input"
            placeholder="Dianne"
            register={register}
            errors={errors}
            rules={nameValidationRules}
            disabled={!isEditable}
          />
        </div>

        <div className="form-group">
          <FormInput
            name="lastName"
            label="Last name"
            id="last-name-input"
            placeholder="Russell"
            register={register}
            errors={errors}
            rules={nameValidationRules}
            disabled={!isEditable}
          />
        </div>

        <div className="form-group">
          <FormInput
            type="date"
            name="birthDate"
            label="Date of birth"
            id="date-input"
            placeholder="dd.mm.yyyy"
            register={register}
            errors={errors}
            rules={ageValidationRules}
            disabled={!isEditable}
          />
        </div>

        <Button
          type={isEditable ? 'button' : 'submit'}
          onClick={toggleEditable}
        >
          {isEditable ? 'Save Changes' : 'Edit'}
        </Button>
      </div>
    </form>
  );
}
