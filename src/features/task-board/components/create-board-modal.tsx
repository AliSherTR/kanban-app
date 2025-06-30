"use client";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const formSchema = z.object({
  boardName: z.string().min(1, { message: "Board name is required" }),
  columns: z
    .array(
      z.object({
        name: z.string().min(1, { message: "Column name is required" }),
      })
    )
    .min(1, { message: "At least one column is required" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateBoardModal() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      boardName: "",
      columns: [{ name: "To Do" }, { name: "Doing" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "columns",
  });

  // Handle form submission
  const onSubmit = (values: FormValues) => {
    console.log("Form submitted with values:", values);
    // Here you can add logic to save the board data (e.g., API call)
  };

  return (
    <DialogHeader>
      <DialogTitle>Create a new board</DialogTitle>
      <DialogDescription>
        Enter the board name and define its columns. You can add or remove
        columns as needed.
      </DialogDescription>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
          {/* Board Name Field */}
          <FormField
            control={form.control}
            name="boardName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Board Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Project Alpha" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Columns Field Array */}
          <div>
            <FormLabel>Board Columns</FormLabel>
            <div className="space-y-2">
              {fields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`columns.${index}.name`}
                  render={({ field }) => (
                    <>
                      <FormItem className="flex items-center gap-2 mt-2">
                        <FormControl>
                          <Input placeholder="e.g. To Do" {...field} />
                        </FormControl>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => remove(index)}
                          disabled={fields.length <= 1} // Prevent removing if only one column remains
                          className=" text-gray-500 hover:text-red-700"
                        >
                          <X size={20} strokeWidth={5} />
                        </Button>
                      </FormItem>
                      <FormMessage />
                    </>
                  )}
                />
              ))}
            </div>
            <Button
              type="button"
              variant="secondary"
              className="mt-4 w-full bg-[#635fc7] text-white hover:bg-[#635fc7] rounded-full "
              onClick={() => append({ name: "" })}
            >
              + Add New Column
            </Button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-[#635fc7] hover:bg-[#635fc7]/90 rounded-full text-white"
          >
            Create Board
          </Button>
        </form>
      </Form>
    </DialogHeader>
  );
}
