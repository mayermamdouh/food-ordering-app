"use client";

import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { Pages, Routes } from "@/constants/enums";
// import { toast } from "react-toastify";
import useFormFields from "@/hooks/useFormFields";
// import { signup } from "@/server/_actions/auth";
import { IFormField } from "@/types/app";
import { Translations } from "@/types/translations";
import { ValidationErrors } from "@/validations/auth";
import { useParams, useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import FormField from "@/components/FormsFields/formField";
import { signup } from "@/server/actions/auth";

import { toast } from "react-toastify";

const initialState: {
  message?: string;
  error?: ValidationErrors;
  status?: number | null;
  formData?: FormData | null;
} = {
  message: "",
  error: {},
  status: null,
  formData: null,
};
function Form({ translations }: { translations: Translations }) {
  const { locale } = useParams();
  const router = useRouter();
  const [state, action, pending] = useActionState(signup, initialState);
  const { getFormFields } = useFormFields({
    slug: Pages.Register,
    translations,
  });

  useEffect(() => {
    if (state.status && state.message) {
      if (state.status === 201) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
    if (state.status === 201) {
      router.replace(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`);
    }
  }, [locale, router, state.message, state.status]);
  return (
    <form action={action}>
      {getFormFields().map((field: IFormField) => {
        const fieldValue = state.formData?.get(field.name) as string;
        return (
          <div key={field.name} className="mb-3">
            <FormField
              {...field}
              error={state.error}
              defaultValue={fieldValue}
            />
          </div>
        );
      })}
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? <Loader /> : translations.auth.register.submit}
      </Button>
    </form>
  );
}

export default Form;
