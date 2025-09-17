"use client";
import FormField from "@/components/FormsFields/formField";
import { Button } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import { IFormField } from "@/types/app";
import { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { Translations } from "@/types/translations";
import Loader from "@/components/ui/loader";
import { useParams, useRouter } from "next/navigation";

export default function Form({ translations }: { translations: Translations }) {
  const { locale } = useParams();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { getFormFields } = useFormFields({
    slug: Pages.LOGIN,
    translations,
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (res?.status === 200) {
        toast.success(translations.messages.loginSuccessful);
        router.replace(`/${locale}/${Routes.PROFILE}`);
      }
      if (res?.error) {
        const validationError = JSON.parse(res?.error).validationError;
        setError(validationError);
        const responseError = JSON.parse(res?.error).responseError;
        if (responseError) {
          toast.error(responseError);
        }
      }
    } catch {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={onSubmit} ref={formRef}>
      {getFormFields().map((field: IFormField) => (
        <div className="mb-3" key={field.id}>
          <FormField error={error} {...field} />
        </div>
      ))}
      <Button type="submit" disabled={isLoading} className="w-full mt-4">
        {isLoading ? <Loader /> : translations.auth.login.submit}
      </Button>
    </form>
  );
}
