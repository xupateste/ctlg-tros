import React from "react";
import {Text, Box, Button} from "@chakra-ui/core";
import {getTestDaysLeft} from "./SelectorsTypeTenant"
// import {useTenant} from "~/tenant/hooks";

interface Props {
  typeTenant: string;
  createdAt: number;
  slug: string;
  itExceeds: boolean;
}

const BannerTenant: React.FC<Props> = ({typeTenant, createdAt, slug, itExceeds}) => {
  // const {createdAt, typeTenant} = useTenant();
  // const [param, setParam] = React.useState('')

  const onUpgradePlan = (value) => {
    if (value === 'getBetterPlan') {
      window.open(
        `https://web.ferreteros.app/catalogos/actualizar-plan/${encodeURIComponent(slug.toUpperCase())}`,
        // `https://web.ferreteros.app/catalogos/${encodeURIComponent('Hola quisiera saber que opciones tengo para mejorar mi plan. Mi cuenta: '+slug.toUpperCase())}`,
        '_blank' // <- This is what makes it open in a new window.
      );
    }
    if (value === 'extendDays') {
      window.open(
        `https://web.ferreteros.app/catalogos/extender-prueba/${encodeURIComponent(slug.toUpperCase())}`,
        // `https://web.ferreteros.app/catalogos/extender-prueba/${encodeURIComponent('Hola quisiera extender mi periodo de prueba. Mi cuenta: '+slug.toUpperCase())}`,
        '_blank' // <- This is what makes it open in a new window.
      );
    }
    if (value === 'newPlan') {
      window.open(
        `https://web.ferreteros.app/catalogos/actualizar-plan/${encodeURIComponent(slug.toUpperCase())}`,
        // `https://web.ferreteros.app/catalogos/actualizar-plan/${encodeURIComponent('Hola quisiera elegir un mejor Plan. Mi cuenta: '+slug.toUpperCase())}`,
        '_blank' // <- This is what makes it open in a new window.
      );
    }
    if (value === 'promo') {
      window.open(
        `https://web.ferreteros.app/catalogos/promociones/${encodeURIComponent(slug.toUpperCase())}`,
        // `https://web.ferreteros.app/catalogos/promociones/${encodeURIComponent('Hola quisiera saber más sobre las Promociones. Mi cuenta: '+slug.toUpperCase())}`,
        '_blank' // <- This is what makes it open in a new window.
      );
    }
    if (value === 'yanapay') {
      window.open(
        `https://web.ferreteros.app/catalogos/ayuda/${encodeURIComponent(slug.toUpperCase())}`,
        // `https://web.ferreteros.app/catalogos/ayuda/${encodeURIComponent('Hola quisiera apoyo con respecto a mi tienda. Mi cuenta: '+slug.toUpperCase())}`,
        '_blank' // <- This is what makes it open in a new window.
      );
    }
  }

  // return (
  // <>
  //   {(getTestDaysLeft(createdAt) <= 0 && 
  //         <Box mb={{base:2, sm:0}}>
  //           <Text d="inline-box"><b>El Periodo de Prueba ha terminado.</b> Lo entendemos, estas full, deseas extender los días de prueba?</Text>
  //           <Button onClick={() => {onUpgradePlan('extendDays')}} bg="white" color="red.400" ml={{base:0, sm:3 }}>Escríbenos</Button>
  //         </Box>)
  //     ||  (typeTenant === 'test' && 
  //         <Box mb={{base:2, sm:0}}>
  //           <Text d="inline-box">Tienes activado el Plan de Prueba por 40 días. <b>¡Puedes subir hasta 200 productos!</b> Te quedan {getTestDaysLeft(createdAt)} días.</Text>
  //           <Button onClick={() => {onUpgradePlan('getBetterPlan')}} bg="white" color="red.400" ml={{base:0, sm:3 }}>Mejorar Plan</Button>
  //         </Box>)
  //     ||  (typeTenant === 'free' &&
  //         <Box mb={{base:2, sm:0}}>
  //           <Text d="inline-box"><b>Tienes activado el Plan Gratuito.</b> Se limitó la cantidad de productos a 10. <b>¡Ya está disponible un Nuevo Plan!</b></Text>
  //           <Button onClick={() => {onUpgradePlan('newPlan')}} bg="white" color="red.400" ml={{base:0, sm:3 }}>Nuevo Plan</Button>
  //         </Box>)
  //     ||  <Text>My Friend</Text>

  //   }
  // </>
  // );
  if (itExceeds) { //itexceeds ?
    return (
      <Box mb={{base:2, sm:0}}>
        <Text d="inline-box"><b>La cantidad de productos excede el límite de tu plan.</b> Se limitó la cantidad de productos a mostrar en tu tienda.</Text>
        <Button onClick={() => {onUpgradePlan('getBetterPlan')}} bg="white" color="red.400" ml={{base:0, sm:3 }}>Mejorar Plan</Button>
      </Box>
    );
  }

  switch (typeTenant) {
  // if test -> 1:escenario mas opciones?   2:escenario fin prueba?
    case 'test' : {
      if (getTestDaysLeft(createdAt) <= 0) {
        return (
          <Box mb={{base:2, sm:0}}>
            <Text d="inline-box"><b>El Periodo de Prueba ha terminado.</b> Lo entendemos, estas muy ocupado ¿Deseas más días de prueba?</Text>
            <Button onClick={() => {onUpgradePlan('extendDays')}} bg="white" color="red.400" ml={{base:0, sm:3 }}>Escríbenos</Button>
          </Box>
        );
      }
      return (
        <Box mb={{base:2, sm:0}}>
          {/*<Text d="inline-box"><b>¡Enhorabuena!</b> Te activamos el Plan de Prueba por 40 días. <b>¡Sube hasta 500 productos!</b> Te quedan {getTestDaysLeft(createdAt)} días.</Text>*/}
          {/*<Button onClick={() => {onUpgradePlan('getBetterPlan')}} bg="white" color="red.400" ml={{base:0, sm:3 }}>Mejorar Plan</Button>*/}
          <Text d="inline-box"><b>¡Enhorabuena!</b> Tu tiempo es oro, si necesitas ayuda con respecto a tu tienda, no dudes en escribirnos.</Text>
          <Button onClick={() => {onUpgradePlan('yanapay')}} bg="white" color="red.400" ml={{base:0, sm:3 }}>Ayuda ✋</Button>
        </Box>
      );
    }
  // if free -> 1:se liminto a 10 p. escenario nuevos planes mas económicos?
    case 'free' : {
      return (
        <Box mb={{base:2, sm:0}}>
          <Text d="inline-box"><b>Tienes activado el Plan Gratuito.</b> Se limitó la cantidad de productos a 25. <b>¡Puedes elegir un mejor Plan!</b></Text>
          <Button onClick={() => {onUpgradePlan('newPlan')}} bg="white" color="red.400" ml={{base:0, sm:3 }}>Elegir Plan</Button>
        </Box>
      );
    }
  // if emprendedor / p###   -> escenario mas opciones?
    default : {
      return (
        <Box mb={{base:2, sm:0}}>
          <Text d="inline-box">¿Planeando quedarte por un tiempo? <b>¡Conoce nuestras promociones especiales para ti!</b></Text>
          <Button onClick={() => {onUpgradePlan('promo')}} bg="white" color="red.400" ml={{base:0, sm:3 }}>Promociones</Button>
        </Box>
      );
    }
  }
};

export default BannerTenant;
