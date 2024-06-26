import React from "react";
import {useForm, FormContext} from "react-hook-form";
import {Stack} from "@chakra-ui/core";
import {Contact} from "../types";
import Input from "~/ui/inputs/Input";
import Textarea from "~/ui/inputs/Textarea";
import FormControl from "~/ui/form/FormControl";


interface Props {
  defaultValues?: Partial<Contact>;
  onSubmit: (values: Partial<Contact>) => void;
  children: (options: {
    form: JSX.Element;
    isLoading: boolean;
    submit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  }) => JSX.Element;
  isNew: boolean;
}


const ContactForm: React.FC<Props> = ({defaultValues, children, onSubmit, isNew}) => {
  const salesPerson = {phone:"Tienda", sales1:"Ventas1", sales2:"Ventas2", sales3:"Ventas3", sales4:"Ventas4", sales5:"Ventas5",
                       sales6:"Ventas6", sales7:"Ventas7", sales8:"Ventas8", sales9:"Ventas9", sales10:"Ventas10",};

  const currentSales = defaultValues.sales ? defaultValues.sales : "phone";

  const form = useForm<Partial<Contact>>({defaultValues});
  const {handleSubmit: submit, errors, register, formState} = form;
  // const values = watch();

  function handleSubmit(values: Partial<Contact>) {
    const contact = {...defaultValues, ...values};
    contact["sales"] = currentSales;

    return onSubmit(contact);
  }

  return children({
    isLoading: formState.isSubmitting,
    submit: submit(handleSubmit),
    form: (
    	<FormContext {...form}>
        <form onSubmit={submit(handleSubmit)}>
          <Stack spacing={4}>
            <Stack isInline spacing={2}>
            	<FormControl
                isRequired
                error={errors.phone && "Ingrese un número de Whatsapp válido. Ej: +51999111111"}
                label="WhatsApp"
                name="phone"
                help="Simbolo(+) + Código de país + teléfono. Ej: +51999111111"
              >
                <Input
                  ref={register({required: true, minLength: 10, maxLength: 15,  pattern: /^[+][0-9]+$/})}
                  isDisabled={isNew ? false : true}
                  name="phone"
                  placeholder="Ej. +51999111111"
                />
              </FormControl>
              <FormControl
                label="Vendedor"
                name="sales"
                help="Agente de Ventas"
              >
                <Input
                  isDisabled={true}
                  name="sales"
                  defaultValue={salesPerson[currentSales]}
                />
              </FormControl>
            </Stack>
            <FormControl
              isRequired
              error={errors.name && "El nombre no puede ser mayor a 70 caracteres"}
              help="Ej: Ferretería Amigos SAC"
              label="Nombre"
              name="name"
            >
              <Input
                ref={register({maxLength: 70})}
                autoFocus
                name="name"
                placeholder="Nombre del cliente"
              />
            </FormControl>
            <FormControl
              error={errors.location && "La dirección / ubicación no puede ser mayor a 1400 caracteres"}
              help="Máximo 1400 caracteres"
              label="Dirección / Ubicación"
              name="location"
            >
              <Textarea
                ref={register({maxLength: 1400})}
                maxLength={1400}
                name="location"
                placeholder="Ej. El Porvenir - Trujillo"
              />
            </FormControl>
            <FormControl
              error={errors.description && "La descripción no puede ser mayor a 1400 caracteres"}
              help="Máximo 1400 caracteres"
              label="Observaciones"
              name="description"
            >
              <Textarea
                ref={register({maxLength: 1400})}
                maxLength={1400}
                name="description"
                placeholder="Ej. Cliente paga contraentrega"
              />
            </FormControl>
          </Stack>
    		</form>
    	</FormContext>
    ),
  });
};

export default ContactForm;
