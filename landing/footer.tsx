import React from "react";

import { 
  Box,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Button,
  Image,
 } from '@chakra-ui/core';

interface Props {
  handleLoginVisibility: () => void;
}

const Footer: React.FC<Props> = (props) => {
  return (
    <Box
      bg='cyan.600'
      color='white'>
      <Flex as={Stack} w="100%" p={10} fontSize={19}>
        <SimpleGrid m="auto" columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack textAlign='center'>
            <Link href="/">Inicio</Link>
          </Stack>
          <Stack textAlign='center'>
            <Link href="#Planes">Planes</Link>
          </Stack>
          <Stack textAlign='center'>
            <Link href="#Preguntas">Preguntas frecuentes</Link>
          </Stack>
          <Stack textAlign='center'>
            <Button
              as={'a'}
              fontSize={'lg'}
              color='white'
              variant={'link'}
              onClick={props.handleLoginVisibility}
              pt={1}
              _hover={{
                textDecoration: 'none',
                color: 'white'
              }}>
              Iniciar sesión
            </Button>
          </Stack>
        </SimpleGrid>
      </Flex>
      <Box pb={5} textAlign="center">
        <Flex
          borderBottom = '1px solid'
          borderColor = 'cyan.700'
          flexGrow={1}/>
        <Flex w="100%" mt={5}>
          <Flex m="auto">
            <Link href="https://ferreteros.app">
              <Image src={'/assets/ferreteros-app-standalone.png'} h={12}/>         
            </Link>
          </Flex>
        </Flex>
        <Text pt={6} fontSize={'sm'} textAlign={'center'}>
          © {new Date().getFullYear()} Ferreteros.app Todos los derechos reservados
        </Text>
      </Box>
    </Box>
  );
};

export async function getInitialProps({res, err}) {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return {statusCode};
}


export default Footer;
