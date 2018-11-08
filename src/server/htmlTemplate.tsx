import * as React from 'react';
import * as ReactDOM from 'react-dom/server';

const Html = () => (
    <html lang="en" className="">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <title>LMS</title>
            <link rel="shortcut icon" href="" type="image/png"/>
            <link rel="stylesheet"    href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.0/dist/semantic.min.css" />
            <style
                type="text/css"
                dangerouslySetInnerHTML={{
                    __html: `body {
                    background-color: #eeeff1;
                }`,
                }}
            />
        </head>
        <body>
            <div id="app" />
            <script
                type="text/javascript"
                src="/app.js"
            />
        </body>
    </html>
);

export const renderTemp = () =>
    ReactDOM.renderToStaticMarkup(<Html />);