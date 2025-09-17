import { Pages, Routes } from "@/constants/enums";
import { IFormField, IFormFieldsVariables } from "@/types/app";
import { Translations } from "@/types/translations";

interface Props extends IFormFieldsVariables {
  translations: Translations;
}

const useFormFields = ({ slug, translations }: Props) => {
  const loginFields = (): IFormField[] => [
    {
      label: translations.auth.login.email.label,
      name: "email",
      type: "email",
      placeholder: translations.auth.login.email.placeholder,
      autoFocus: true,
      id: "1",
    },
    {
      label: translations.auth.login.password.label,
      name: "password",
      type: "password",
      placeholder: translations.auth.login.password.placeholder,
      id: "2",
    },
  ];

  const signupField = (): IFormField[] => [
    {
      label: translations.auth.register.name.label,
      name: "name",
      type: "text",
      placeholder: translations.auth.register.name.placeholder,
      autoFocus: true,
      id: "1",
    },
    {
      label: translations.auth.register.email.label,
      name: "email",
      type: "email",
      placeholder: translations.auth.register.email.placeholder,
      id: "2",
    },
    {
      label: translations.auth.register.password.label,
      name: "password",
      type: "password",
      placeholder: translations.auth.register.password.placeholder,
      id: "3",
    },
    {
      label: translations.auth.register.confirmPassword.label,
      name: "confirmPassword",
      type: "password",
      placeholder: translations.auth.register.confirmPassword.placeholder,
      id: "4",
    },
  ];
  const profileField = (): IFormField[] => [
    {
      label: translations.profile.form.name.label,
      name: "name",
      type: "text",
      placeholder: translations.profile.form.name.placeholder,
      autoFocus: true,
      id: "1",
    },
    {
      label: translations.profile.form.email.label,
      name: "email",
      type: "email",
      placeholder: translations.profile.form.email.placeholder,
      id: "2",
    },
    {
      label: translations.profile.form.phone.label,
      name: "phone",
      type: "text",
      placeholder: translations.profile.form.phone.placeholder,
      id: "3",
    },
    {
      label: translations.profile.form.address.label,
      name: "streetAddress",
      type: "text",
      placeholder: translations.profile.form.address.placeholder,
      id: "4",
    },
    {
      label: translations.profile.form.postalCode.label,
      name: "postalCode",
      type: "text",
      placeholder: translations.profile.form.postalCode.placeholder,
      id: "5",
    },
    {
      label: translations.profile.form.city.label,
      name: "city",
      type: "text",
      placeholder: translations.profile.form.city.placeholder,
      id: "6",
    },
    {
      label: translations.profile.form.country.label,
      name: "country",
      type: "text",
      placeholder: translations.profile.form.country.placeholder,
      id: "7",
    },
  ];
  const addProductFields = (): IFormField[] => [
    {
      label: translations.admin["menu-items"].form.name.label,
      name: "name",
      type: "text",
      placeholder: translations.admin["menu-items"].form.name.placeholder,
      autoFocus: true,
      id: "1",
    },
    {
      label: translations.admin["menu-items"].form.description.label,
      name: "description",
      type: "text",
      placeholder:
        translations.admin["menu-items"].form.description.placeholder,
      id: "2",
    },
    {
      label: translations.admin["menu-items"].form.basePrice.label,
      name: "basePrice",
      type: "text",
      placeholder: translations.admin["menu-items"].form.basePrice.placeholder,
      id: "3",
    },
  ];

  const getFormFields = (): IFormField[] => {
    switch (slug) {
      case Pages.LOGIN:
        return loginFields();
      case Pages.Register:
        return signupField();
      case Routes.PROFILE:
        return profileField();
      case `${Routes.ADMIN}/${Pages.MENU_ITEMS}`:
        return addProductFields();
      default:
        return [];
    }
  };

  return { getFormFields };
};

export default useFormFields;
