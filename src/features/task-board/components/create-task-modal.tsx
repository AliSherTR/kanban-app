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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

// Define the form schema using Zod
const formSchema = z.object({
  taskName: z.string().min(1, { message: "Task name is required" }),
  description: z
    .string()
    .min(30, { message: "Description should be atleast 30 characters" }),
  subtasks: z
    .array(
      z.object({
        name: z.string().min(1, { message: "Subtask name is required" }),
      })
    )
    .optional(),
  status: z.string().min(1, { message: "Status is required" }),
});

type FormValues = z.infer<typeof formSchema>;

// Static status options (can be replaced with dynamic board columns)
const statusOptions = ["To Do", "Doing", "Done"];

export default function AddTaskModal() {
  // Initialize the form with react-hook-form and Zod resolver
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskName: "",
      description: "",
      subtasks: [],
      status: "",
    },
  });

  // Use useFieldArray to manage dynamic subtasks
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "subtasks",
  });

  // Handle form submission
  const onSubmit = (values: FormValues) => {
    console.log("Form submitted with values:", values);
    // Here you can add logic to save the task data (e.g., API call)
  };

  return (
    <DialogHeader>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogDescription>
        Enter the task details, including name, description, subtasks, and
        status.
      </DialogDescription>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
          {/* Task Name Field */}
          <FormField
            control={form.control}
            name="taskName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Develop Landing Page" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Task Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g. Design and implement the landing page UI"
                    {...field}
                    className="resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Subtasks Field Array */}
          <div>
            <FormLabel>Subtasks</FormLabel>
            <div className="space-y-2">
              {fields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`subtasks.${index}.name`}
                  render={({ field }) => (
                    <>
                      <FormItem className="flex items-center gap-2 mt-2">
                        <FormControl>
                          <Input
                            placeholder="e.g. Create wireframe"
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => remove(index)}
                          className="text-gray-500 hover:text-red-700"
                        >
                          <X size={20} strokeWidth={5} />
                        </Button>
                      </FormItem>
                      <FormMessage className=" block" />
                    </>
                  )}
                />
              ))}
            </div>
            <Button
              type="button"
              variant="secondary"
              className="mt-4 w-full bg-[#635fc7] text-white hover:bg-[#635fc7] rounded-full"
              onClick={() => append({ name: "" })}
            >
              + Add New Subtask
            </Button>
          </div>

          {/* Status Dropdown */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className=" w-full">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="dark:bg-[#2b2c37]">
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className=" block" />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-[#635fc7] hover:bg-[#635fc7]/90 rounded-full text-white"
          >
            Create Task
          </Button>
        </form>
      </Form>
    </DialogHeader>
  );
}
