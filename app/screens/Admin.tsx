import React from "react";
import {
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  Stack,
  Button,
  Link,
  Text,
} from "@chakra-ui/core";

import HomeAdminScreen from "./Home";

//added
import {useRouter} from "next/router";
import {useTenant} from "~/tenant/hooks";
import CrossIcon from "~/ui/icons/Cross"

import ProductsAdminScreen from "~/product/screens/Admin/Admin";
import OrdersAdminScreen from "~/product/screens/Orders/Orders";
import ContactAdminScreen from "~/contact/screens/Admin/Admin";
import TenantAdminScreen from "~/tenant/screens/Admin";
import BoxIcon from "~/ui/icons/Box";
import SlidersIcon from "~/ui/icons/Sliders";
import CheckIcon from "~/ui/icons/Check";
import HelpCircleIcon from "~/ui/icons/HelpCircle";
import LogOutIcon from "~/ui/icons/LogOut";
import IconButton from "~/ui/controls/IconButton";
import {useSession} from "~/session/hooks";
import Content from "~/ui/structure/Content";
import {useTranslation} from "~/i18n/hooks";
import HomeIcon from "~/ui/icons/Home";
import Users from "~/ui/icons/Users";
import BannerTenant from "./Home/BannerTenant";

interface Props {
  timestamp: number;
}

const AdminScreen: React.FC<Props> = (timestamp) => {
  const {signOut} = useSession();
  const t = useTranslation();
  const {createdAt, slug, typeTenant} = useTenant();
  const [isVisible, setVisible] = React.useState<boolean>(true)
  // setVisible(true)
  //added
  const router = useRouter();

  const[itExceeds, setItExceeds]= React.useState<boolean>(false);

  const handleVisibility = () => {
    setVisible(!isVisible)
  }

  React.useEffect(() => {
    itExceeds ? setVisible(itExceeds) : setVisible(true)
    // setVisible(itExceeds)
  }, [itExceeds])


  //console.log(router);

  return (
    <Box as="main" backgroundColor="white">
      <Flex alignItems="center" boxShadow="sm" height={16} paddingY={2} position="relative">
        <Content paddingX={4}>
          <Flex alignItems="center" justifyContent="space-between" width="100%">
            <Stack isInline alignItems="center" spacing={2}>
              <Text fontSize={30} fontWeight={900}>ADMIN</Text>
              <Link
                _hover={{
                  textDecoration: "none",
                }}
                href={`/${router.query.slug}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Button
                  _hover={{
                    backgroundColor: "primary.100",
                  }}
                  backgroundColor="primary.50"
                  rightIcon="external-link"
                  size="xs"
                  variant="ghost"
                  variantColor="primary"
                >
                  {t("admin.preview")}
                </Button>
              </Link>
            </Stack>
            <Stack isInline spacing={{base: 0, sm: 8}}>
              <Link
                isExternal
                href={`https://web.ferreteros.app/catalogos/ayuda`}
                lineHeight="normal"
              >
                <IconButton
                  isCollapsable
                  color="black"
                  fontWeight="500"
                  leftIcon={HelpCircleIcon}
                  variant="link"
                >
                  {t("common.help")}
                </IconButton>
              </Link>
              <IconButton
                isCollapsable
                color="black"
                fontWeight="500"
                leftIcon={LogOutIcon}
                variant="link"
                onClick={signOut}
              >
                {t("common.exit")}
              </IconButton>
            </Stack>
          </Flex>
        </Content>
      </Flex>
      <Tabs size="lg" variantColor="primary">
        <Stack
          isInline
          alignItems="center"
          backgroundColor="gray.100"
          borderBottom="1px solid"
          borderColor="gray.200"
          spacing={4}
        >
          <Content paddingX={4}>
            <Box width="100%">
              <TabList border="none" height={16} py={1} overflowX="auto">
                <Tab fontSize="md">
                  <HomeIcon marginRight={2} />
                  <Text fontWeight={600}>{t("common.home")}</Text>
                </Tab>
                <Tab fontSize="md">
                  <SlidersIcon marginRight={2} />
                  <Text fontWeight={600}>{t("common.shop")}</Text>
                </Tab>
                <Tab fontSize="md">
                  <BoxIcon marginRight={2} />
                  <Text fontWeight={600}>{t("common.products")}</Text>
                </Tab>
                <Tab fontSize="md">
                  <CheckIcon marginRight={2} />
                  <Text fontWeight={600}>{t("admin.orders")}</Text>
                </Tab>
                <Tab fontSize="md">
                  <Users marginRight={2} />
                  <Text fontWeight={600} whiteSpace="nowrap">{'Mi Lista'}</Text>
                </Tab>
              </TabList>
            </Box>
          </Content>
        </Stack>
        {isVisible && (
          <Stack w="full" bg='red.400' justifyContent='center' color='white' py={3}>
            <Content paddingX={4}>
              <Flex justifyContent="space-between" alignItems="center">
                <Flex alignItems="center" direction={{base:'column', sm:'row' }} textAlign="center" px={4}>
                  <BannerTenant typeTenant={typeTenant} createdAt={createdAt} slug={slug} itExceeds={itExceeds} />
                </Flex>
                <Link onClick={handleVisibility}><CrossIcon></CrossIcon></Link>
              </Flex>
            </Content>
          </Stack>
        )}
        <Box>
          <TabPanels>
            <TabPanel>
              <HomeAdminScreen />
            </TabPanel>
            <TabPanel>
              <TenantAdminScreen />
            </TabPanel>
            <TabPanel>
              <ProductsAdminScreen setItExceeds={setItExceeds} timestamp={timestamp.timestamp}/>
            </TabPanel>
            <TabPanel>
              <OrdersAdminScreen />
            </TabPanel>
            <TabPanel>
              <ContactAdminScreen />
            </TabPanel>
          </TabPanels>
        </Box>
      </Tabs>
    </Box>
  );
};

export default AdminScreen;
