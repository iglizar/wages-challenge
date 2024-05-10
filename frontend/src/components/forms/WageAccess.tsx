import React, { useEffect, useState } from "react";
import { CurrencyId, Wage, useSubmitWageRequest } from "../../models/wages";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

export const WageAccessForm = ({ wages }: { wages: Wage[] }) => {
  const form = useForm();
  const { mutateAsync } = useSubmitWageRequest();

  const [selectedWage, setSelectedWage] = useState<Wage>(
    wages[0] || { currencyId: CurrencyId.USD, amount: 0 }
  );

  useEffect(() => {
    form.setValue("wages", wages);
  }, [form, wages]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedWage({
      ...selectedWage,
      amount: parseFloat(event.target.value),
    });
  };

  const handleCurrencyChange = (currencyId: CurrencyId) => {
    const wage = wages.find((w) => w.currencyId === currencyId);
    setSelectedWage(wage || selectedWage);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutateAsync(selectedWage);
    form.setValue("wages", wages);
  };

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="wages"
          render={() => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Insert Amount"
                  min={0.0}
                  max={selectedWage.amount}
                  step="0.01"
                  value={selectedWage.amount}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <Select onValueChange={handleCurrencyChange}>
                  <div className="flex space-x-4">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={selectedWage.currencyId} />
                    </SelectTrigger>
                    <Button variant="submit">Submit</Button>
                  </div>
                  <SelectContent>
                    {wages.map((wage) => (
                      <SelectItem key={wage.currencyId} value={wage.currencyId}>
                        {wage.currencyId}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
