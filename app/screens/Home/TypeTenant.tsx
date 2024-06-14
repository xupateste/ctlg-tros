import React from "react";
import {Stack, Text, Flex, Button, Divider, Box, Grid} from "@chakra-ui/core";
import {getNameTypeOf /*,getQtyProdsTypeOf*/} from "./SelectorsTypeTenant"
import {useTenant} from "~/tenant/hooks";
import {useToast} from "~/hooks/toast";


// import QrCode from "~/ui/feedback/QrCode";
// import {useTranslation} from "~/i18n/hooks";
// import {ClientTenant} from "~/tenant/types";

// interface Props {
//   tenant: ClientTenant;
// }

// const TypeTenant: React.FC<Props> = ({tenant}) => {
const TypeTenant = () => {
  // const t = useTranslation();
  const {typeTenant, slug} = useTenant();

  const toast = useToast();

  const canShare = {
    clipboard: Boolean(navigator?.clipboard),
  };

  const onUpgradePlan = () => {
    window.open(
      `https://web.ferreteros.app/catalogos/actualizar-plan/${encodeURIComponent(slug.toUpperCase())}`,
      // `https://wa.me/${process.env.MANTAINER_PHONE}?text=${encodeURIComponent('Hola quisiera saber que opciones tengo para mejorar mi plan. Mi tienda: '+slug.toUpperCase())}`,
      '_blank' // <- This is what makes it open in a new window.
    );
  }

  //handleCopyLinkStore
  function handleCopyLinkStore() {
    if (canShare.clipboard) {
      navigator.clipboard
        .writeText('https://ferreteros.app/'+slug)
        .then(() => {
          toast({
            status: 'success',
            title: '¡Copiado!',
            description: 'Link de Tienda',
          });
        })
        .catch(() => {});
    }
  }
   //handleCopyLinkAdmin
  function handleCopyLinkAdmin() {
    if (canShare.clipboard) {
      navigator.clipboard
        .writeText('https://ferreteros.app/'+slug+'/admin')
        .then(() => {
          toast({
            status: 'success',
            title: '¡Copiado!',
            description: 'Panel de Administración',
          });
        })
        .catch(() => {});
    }
  }
   //handleCopyLinkSeller
  function handleCopyLinkSeller() {
    if (canShare.clipboard) {
      navigator.clipboard
        .writeText('https://ferreteros.app/'+slug+'/cliente')
        .then(() => {
          toast({
            status: 'success',
            title: '¡Copiado!',
            description: 'Panel de Administración',
          });
        })
        .catch(() => {});
    }
  }

  return (
  <>
    <Flex borderWidth={2} borderColor="gray.200" padding={4} rounded="md" justifyContent="space-between" >
      <Stack>
        <Flex fontSize="lg">
          Tu Plan:
          <Flex bg="primary.50" px={2} py={0} ml={3} fontSize={16} alignItems="center" rounded="sm">
            {getNameTypeOf(typeTenant)}
          </Flex>
        </Flex>
        {/*<Text color="gray.600">Cantidad máxima de productos: {getQtyProdsTypeOf(typeTenant)}</Text>*/}
        <Text color="gray.600" lineHeight={1}>✅ Catálogo de Productos</Text>
        <Text color="gray.600" lineHeight={1}>✅ Base de Datos de Clientes</Text>
      </Stack>
      <Button onClick={onUpgradePlan} variantColor="primary" color="white">Mejorar</Button>
    </Flex>
    <Divider/>
    <Flex borderWidth={2} borderColor="gray.200" padding={4} rounded="md" justifyContent="space-between" >
      <Stack width="100%">
        <Box overflowX="auto" overflowY="hidden">
          <Grid>
            <Text fontSize="lg">
              Link de Tienda:
            </Text>
            <Flex color="gray.600" bg="primary.50" fontSize={16} px={2} mr={5} alignItems="center" rounded="sm" overflowX="auto">
              {'https://ferreteros.app/'+slug}
            </Flex>
          </Grid>
        </Box>
      </Stack>
      <Button onClick={handleCopyLinkStore} variantColor="primary" size="sm" color="white" m="auto">Copiar</Button>
    </Flex>
    <Divider/>
    <Flex borderWidth={2} borderColor="gray.200" padding={4} rounded="md" justifyContent="space-between" >
      <Stack width="100%">
        <Box overflowX="auto" overflowY="hidden">
          <Grid>
            <Text fontSize="lg">
              Panel de Administración:
            </Text>
            <Flex color="gray.600" bg="primary.50" fontSize={16} px={2} mr={5} alignItems="center" rounded="sm" overflowX="auto">
              {'https://ferreteros.app/'+slug+'/admin'}
            </Flex>
          </Grid>
        </Box>
      </Stack>
      <Button onClick={handleCopyLinkAdmin} variantColor="primary" size="sm" color="white" m="auto">Copiar</Button>
    </Flex>
    <Divider/>
    <Flex borderWidth={2} borderColor="gray.200" padding={4} rounded="md" justifyContent="space-between" >
      <Stack width="100%">
        <Box overflowX="auto" overflowY="hidden">
          <Grid>
            <Text fontSize="lg">
              Asignar Vendedor/Cliente:
            </Text>
            <Flex color="gray.600" bg="primary.50" fontSize={16} px={2} mr={5} alignItems="center" rounded="sm" overflowX="auto">
              {'https://ferreteros.app/'+slug+'/cliente'}
            </Flex>
          </Grid>
        </Box>
      </Stack>
      <Button onClick={handleCopyLinkSeller} variantColor="primary" size="sm" color="white" m="auto">Copiar</Button>
    </Flex>
  </>
  );
};

export default TypeTenant;
