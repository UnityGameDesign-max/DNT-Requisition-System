import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type FieldConfig = {
  name: string;
  type: "text" | "textarea" | "select" | "date";
  label: string;
  options?: string[];
  placeholder?: string;
};

interface ReusableFormProps {
  fields: FieldConfig[];
  onSubmit: (data: any) => void;
  defaultValues: any;
}

export const ReusableForm: React.FC<ReusableFormProps> = ({
  fields,
  onSubmit,
  defaultValues,
}) => {
  const methods = useForm({ defaultValues });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-6 mb-3">
          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name}>{field.label}</Label>
              <FormField
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormControl>
                      {field.type === "text" && (
                        <Input id={field.name} placeholder={field.placeholder} {...formField} />
                      )}
                      {field.type === "textarea" && (
                        <Textarea id={field.name} placeholder={field.placeholder} {...formField} />
                      )}
                      {field.type === "select" && field.options && (
                        <Select onValueChange={formField.onChange}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options.map((option, idx) => (
                              <SelectItem key={idx} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      {field.type === "date" && (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !formField.value && "text-muted-foreground"
                              )}
                            >
                              {formField.value ? format(formField.value, "PPP") : <span>Select Date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <Calendar
                              mode="single"
                              selected={formField.value}
                              onSelect={formField.onChange}
                              disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                            />
                          </PopoverContent>
                        </Popover>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>
        <Button type="submit">Save</Button>
      </form>
    </FormProvider>
  );
};
