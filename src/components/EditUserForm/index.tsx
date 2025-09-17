"use client";
import { Translations } from "@/types/translations";
import { UserRole } from "@prisma/client";
import { Session } from "next-auth";
import { Button } from "../ui/button";
import Loader from "../ui/loader";

import Image from "next/image";
import { IFormField } from "@/types/app";
import useFormFields from "@/hooks/useFormFields";
import { InputTypes, Routes } from "@/constants/enums";
import FormField from "../FormsFields/formField";
import { useActionState, useEffect, useState } from "react";
import Checkbox from "../FormsFields/checkbox";
import { ValidationErrors } from "@/validations/auth";
import { updateProfile } from "./_actions/profileAction";
import { CameraIcon } from "lucide-react";
import { toast } from "react-toastify";

export default function EditUserForm({
  translations,
  user,
}: {
  translations: Translations;
  user: Session["user"];
}) {
  const formData = new FormData();
  Object.entries(user).forEach(([key, value]) => {
    if (value !== null && value !== undefined && key !== "image") {
      formData.append(key, value.toString());
    }
  });

  const [isAdmin, setIsAdmin] = useState(user.role === UserRole.ADMIN);
  const [selectedImage, setSelectedImage] = useState(user.image ?? "");
  const { getFormFields } = useFormFields({
    slug: Routes.PROFILE,
    translations,
  });

  const initialState: {
    message?: string;
    error?: ValidationErrors;
    status?: number | null;
    formData?: FormData | null;
  } = {
    message: "",
    error: {},
    status: null,
    formData,
  };
  const [state, action, pending] = useActionState(
    updateProfile.bind(null, isAdmin),
    initialState
  );

  useEffect(() => {
    if (state.message && state.status && !pending) {
      if (state.status === 200) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [pending, state.message, state.status]);

  useEffect(() => {
    setSelectedImage(user.image as string);
  }, [user.image]);
  return (
    <form action={action} className="flex flex-col md:flex-row gap-10">
      <div className="group relative w-[200px] h-[200px] overflow-hidden rounded-full mx-auto">
        {selectedImage && (
          <Image
            src={selectedImage}
            alt={user.name}
            fill
            className="rounded-full object-cover"
          />
        )}

        <div
          className={`${
            selectedImage
              ? "group-hover:opacity-100 opacity-0 transition-opacity duration-200"
              : ""
          } absolute top-0 left-0 w-full h-full bg-gray-50/40`}
        >
          <UploadImage setSelectedImage={setSelectedImage} />
        </div>
      </div>

      <div className="flex-1">
        {getFormFields().map((field: IFormField) => {
          const fieldValue =
            state?.formData?.get(field.name) ?? formData.get(field.name);

          return (
            <div key={field.name} className="mb-3">
              <FormField
                {...field}
                defaultValue={fieldValue as string}
                error={state?.error}
                readOnly={field.type === InputTypes.EMAIL}
              />
            </div>
          );
        })}
        {user.role === UserRole.ADMIN && (
          <div className="flex items-center gap-2 my-4">
            <Checkbox
              name="admin"
              checked={isAdmin}
              onClick={() => setIsAdmin(!isAdmin)}
              label="Admin"
            />
          </div>
        )}
        <Button type="submit" className="w-full">
          {pending ? <Loader /> : translations.save}
        </Button>
      </div>
    </form>
  );
}

const UploadImage = ({
  setSelectedImage,
}: {
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    }
  };
  return (
    <>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="image-upload"
        onChange={handleImageChange}
        name="image"
      />
      <label
        htmlFor="image-upload"
        className="border rounded-full w-[200px] h-[200px] flex items-center justify-center cursor-pointer"
      >
        <CameraIcon className="w-8 h-8 text-accent" />
      </label>
    </>
  );
};
