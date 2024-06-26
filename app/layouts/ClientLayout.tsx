import React from "react";
import Head from "next/head";
import {Global, css} from "@emotion/core";

import {META} from "../constants/config";

import {ClientTenant} from "~/tenant/types";

interface Props {
  tenant: ClientTenant;
}

const ClientLayout: React.FC<Props> = ({tenant, children}) => (
  <>
    <Global
      styles={css`
        html,
        body {
          height: 100%;
          width: 100%;
          max-width: 100vw;
        }

        * {
          letter-spacing: -0.2px;
          touch-action: manipulation;
          font-family: "Roboto", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Oxygen",
            "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif !important;
        }
      `}
    />
    <Head>
      <link href={META.favicon} rel="icon" />
      <link href={tenant.logo || META.appleicon} rel="apple-touch-icon" />
      <link href={`${META.url}/${tenant.slug}`} rel="canonical" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700&display=swap"
        rel="stylesheet"
      />

      <title>{tenant.title + ' - ' + tenant.description || META.title}</title>
      <meta content={tenant.color || META.theme} name="theme-color" />
      <meta content={tenant.description || META.description} name="description" />
      <meta content={tenant.keywords || META.keywords} name="keywords" />
      <meta content={META.author} name="author" />
      <meta content={META.author} property="og:site_name" />
      <meta content={META.fbapp} property="fb:app_id" />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={tenant.twitter ? `@${tenant.twitter}` : META.twitter} name="twitter:creator" />
      <meta content={META.twitter} name="twitter:site" />
      {/*{tenant.ga && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${tenant.ga}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${tenant.ga}');`,
            }}
          />
        </>
      )}
      */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=G-6TBQVG5P7V`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-6TBQVG5P7V');`,
                  }}
      />
      {tenant.pixel && (
        <>
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${tenant.pixel}');
      fbq('track', 'PageView');`,
            }}
          />
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=${tenant.pixel}&ev=PageView&noscript=1" />`,
            }}
          />
        </>
      )}
      {(
        <>
          <meta content={tenant.title || META.title} name="twitter:title" />
          <meta content={tenant.description || META.description} name="twitter:description" />
          <meta
            content={tenant.banner || tenant.logo || META.banner?.url}
            property="twitter:image"
          />
          <meta content={`${META.url}/${tenant.slug}`} property="og:url" />
          <meta content="website" property="og:type" />
          <meta
            content={tenant.title ? `${tenant.title} | Ferreteros.app` : META.title}
            property="og:title"
          />
          <meta content={tenant.description || META.description} property="og:description" />
          <meta content={tenant.banner || tenant.logo || META.banner?.url} property="og:image" />
          <meta
            content={tenant.banner || tenant.logo || META.banner?.url}
            property="og:image:secure"
          />
          <meta
            content={tenant.banner || tenant.logo || META.banner?.url}
            property="og:image:url"
          />
          <meta content={META.banner?.format} property="og:image:type" />
          <meta content={META.banner?.width} property="og:image:width" />
          <meta content={META.banner?.height} property="og:image:height" />
          <meta content={tenant.title || META.title} property="og:image:alt" />
        </>
      )}
      <meta content="width=device-width, initial-scale=1.0, viewport-fit=contain" name="viewport" />
    </Head>
    {children}
  </>
);

export default ClientLayout;
