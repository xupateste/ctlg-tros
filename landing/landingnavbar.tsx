import React from "react";

import {
  Box,
  Flex,
  Button,
  Stack,
  Link,
  Image,
  useDisclosure
} from '@chakra-ui/core';

const Hamburger = () => {
  return (
    <svg viewBox="0 0 100 80" width="40" height="40" fill="currentColor">
      <rect width="100" height="20"></rect>
      <rect y="30" width="100" height="20"></rect>
      <rect y="60" width="100" height="20"></rect>
    </svg>
  );
};

interface Props {
  handleLoginVisibility: () => void;
  handleRegisterVisibility: () => void;
}

const LandingNavbar: React.FC<Props> = (props) => {
  const { isOpen, onToggle } = useDisclosure();
  
  const handleLoginClick = () => {
    props.handleLoginVisibility();
    onToggle();
  }

  const handleRegisterClick = () => {
    props.handleRegisterVisibility();
    onToggle();
  }


  return (
    <Box>
      <Flex
        bg='cyan.500'
        color='white'
        minH={'75px'}
        pt={{ base: 2 }}
        pb={{ base: 0 }}
        px={{ base: 4 }}
        align={'center'}>
        <Flex flex={{ base: 1 }} justify={{ base: 'left', md: 'start' }}>
          <Link href="/">
            <Image h={12} mt="-8px" ml={2} src={'/assets/ferreteros-app.png'}></Image>
          </Link>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <Stack direction={'row'} spacing={4}>
              <Box>
                <Link
                  p={2}
                  fontSize={'lg'}
                  fontWeight={500}
                  color='white'
                  href="/"
                  _hover={{
                    textDecoration: 'none',
                    color: 'white',
                  }}>
                  Inicio
                </Link>
              </Box>
              <Box>
                <Link
                  p={2}
                  fontSize={'lg'}
                  fontWeight={500}
                  color='white'
                  href="#Planes"
                  _hover={{
                    textDecoration: 'none',
                    color: 'white',
                  }}>
                  Planes
                </Link>
              </Box>
              <Box>
                <Link
                  p={2}
                  fontSize={'lg'}
                  fontWeight={500}
                  color='white'
                  href="#Preguntas"
                  _hover={{
                    textDecoration: 'none',
                    color: 'white',
                  }}>
                  Preguntas frecuentes
                </Link>
              </Box>
            </Stack>
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          display={{ base: 'none', md: 'inline-flex' }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <Button
            w="full"
            bg="cyan.500"
            size="lg"
            color="white"
            mr={3}
            onClick={props.handleLoginVisibility}
            _hover={{
              bg: "cyan.600",
              color: 'white'
            }}>
            Iniciar sesión
          </Button>
          <Button
            as={'a'}
            w="full"
            fontSize={'lg'}
            fontWeight={600}
            color='white'
            variant={'link'}
            onClick={props.handleRegisterVisibility}
            bg="cyan.700"
            mx={3}
            p={3}
            _hover={{
              textDecoration: 'none',
              color: 'white'
            }}>
            Regístrate
          </Button>
        </Stack>

        <Flex
          flex={{ base: 0, md: 'auto' }}
          display={{ base: 'block', md: 'none' }}>
          <Box onClick={onToggle}>
          {isOpen ? "CERRAR": <Hamburger />}
          </Box>
        </Flex>
      </Flex>

      <Box display={!isOpen ? 'none' : 'block'} textAlign={'center'} width="100%" position="absolute" bg="cyan.500" zIndex={150} py={4}>
        <Link
          href="#Planes"
          onClick={onToggle}
          display="block"
          py={3}
          fontSize={{base:'xl', sm:'xl', lg:'2xl'}}
          fontWeight={700}
          w="100%"
          bg="none"
          color='white'
          _hover={{
            bg: 'none',
            color: 'white',
          }}>
          Planes
        </Link>
        <Link
          href="#Preguntas"
          onClick={onToggle}
          display="block"
          py={3}
          fontSize={{base:'xl', sm:'xl', lg:'2xl'}}
          fontWeight={700}
          w="100%"
          bg="none"
          color='white'
          _hover={{
            bg: 'none',
            color: 'white',
          }}>
          Preguntas frecuentes
        </Link>
        <Box w="100%" mt={3} mb={2}>
          <Button
            bg="cyan.500"
            size="lg"
            color="white"
            mr={3}
            onClick={handleLoginClick}
            _hover={{
              bg: "cyan.600",
              color: 'white'
            }}>
            Iniciar sesión
          </Button>
          <Button
            as={'a'}
            fontSize={'lg'}
            fontWeight={600}
            color='white'
            variant={'link'}
            onClick={handleRegisterClick}
            bg="cyan.700"
            mx={3}
            p={3}
            _hover={{
              textDecoration: 'none',
              color: 'white'
            }}>
            Regístrate
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export async function getInitialProps({res, err}) {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return {statusCode};
}


export default LandingNavbar;
