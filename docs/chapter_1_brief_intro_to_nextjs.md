### Chapter 1: A Brief Introduction to Next.js

- Next.js , open source JS framework  for React by vercel.
- It provides multiple features out of the box.
- Client side rendering (CSR), Server side rendering (SSR) .
- static site generation (SSG), Incremental static regenration (ISR).
- Automatic code-splitting, file-based routing systems, route pre-fetching, Image optimization, Support for internationalization.
- Real full stack framework. Create Ui pages, expose api endpoints.
- Abstract out lot of configuration, needed for a react app like configuring babel, webpack etc.


> For Practice, you need **Node.js** installed on your machine. 

#### Why Nextjs, but not react ?
<p>Next.js is build on top of react only. As next.js is a framework, it makes development easy by hiding out react code from us. We don't have to manually handle react. Next.js will do it for us. We just need to follow rules of next.js (just like you will have in any framework) and we can develop a full stack web application in less time.</p>

#### Getting started with Next.js
<p> We will use tool create-next-app for generating the boilerplate code for a basic Next.js app. </p>


`` 
npx create-next-app \<app-name>
``


>Inside below example repo, there are many examples about using Next.js with different technolgies  
https://github.com/vercel/next.js/tree/canary/examples


We can easily integrate **typescript** by creating tsconfig.json file
or
we can create basic app using ``yarn create next-app --typescript``

#### Custom Babel and webpack configuration

Babel is a JavaScript transcompiler mainly used for transforming modern JavaScript code into a backward-compatible script, which will run without problem on any browser.

>You can customize your default Next.js Babel configuration by simply creating a new file called ``.babelrc`` inside the root of your project. You will notice that if you leave it empty, the Next.js build/development process will throw an error, so make sure to add at least the following code:
``{
  "presets": ["next/babel"]
}
``
This is the Babel preset created by the Vercel team specifically for building and developing Next.js applications

We can add webpack property in ``next.confg.js`` to modify webpack configs.

> Checkout code examples under ``code`` package.
Run using yarn dev