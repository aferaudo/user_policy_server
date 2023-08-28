---
title: Home
layout: default
nav_order: 1
---

# Overview
{: .fs-9 }

These brief instructions will help you get started with the tool. 
{: .fs-6 .fw-300 }

[Get started now](#getting-started){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }
[View it on GitHub][UPS repo]{: .btn .fs-5 .mb-4 .mb-md-0 }

---


The User Policy Server functions as a MUD File server implementation, enabling you to deploy and test your custom MUD files in accordance with the <a href='https://datatracker.ietf.org/doc/html/rfc8520'>Manufacturer Usage Description standard</a> (RFC 8520).

{: .note }
For a comprehensive evaluation of your MUD files, a MUD manager is essential to enforce the rules they contain. You can explore an illustrative example of a MUD Manager [here](https://github.com/aferaudo/osmud)


## Getting started

To make the User Policy Server work, you'll need MongoDB (for storing MUD files) and OpenSSL (to send MUD file signatures in p7s format).


Once you've successfully installed these tools, you can begin populating the database by employing the script located in the "examples" directory. To initiate this process, execute the following command in your terminal:

```bash
node populationdb.js mongodb://127.0.0.1:27017/mudFile json_files/
```

{: .note }
Please note that the MongoDB link in the command should be configured according to your settings, which may involve the inclusion of a username and password.

In addition, you'll need to generate the necessary keys for signing the MUD files. This can be achieved through the following steps:
  * Navigate to the "mudfs/certs" directory.
  * Execute the commands below to generate the required keys:

```bash
# Self certificate procedure
cd mudfs/certs
openssl genrsa -out server.key
openssl req -new -key server.key -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey server.key -out server.pem
rm csr.pem
cp server.key server.key.pem 
```

With these preparations in place, you can proceed by navigating to the "mudfs" directory and executing the following commands:

```bash
npm installl
npm start
```

By default, the application will run on port 443 via HTTPS at https://localhost. 

## About the project

This work is the result of a research period conducted by me during my time at the University of Cambridge in collaboration with the University of Bologna. For more comprehensive insights into the methodology and application of this tool, we invite you to explore the following references: \[[1](https://arxiv.org/abs/2004.08003) , [2](https://doi.org/10.1145/3378679.3394528)\]. These sources provide an in-depth understanding of our utilization of the tool within different contexts.

User Policy Server &copy; 2017-{{ "now" | date: "%Y" }} by [Angelo Feraudo](https://aferaudo.github.io/new_website/).

### License

User Policy Server is distributed by an [MIT license](https://github.com/aferaudo/user_policy_server/blob/master/LICENSE).

### How to cite

If you find this work useful and would like to cite it, please use the following citation format:
```
Angelo Feraudo. (2023). aferaudo/user_policy_server: v0.0.2 (v0.0.2). Zenodo. https://doi.org/10.5281/zenodo.8288918
```

We appreciate your consideration in citing our work. It helps us track its impact and acknowledge the effort that has gone into its development.

----

[^1]: [It can take up to 10 minutes for changes to your site to publish after you push the changes to GitHub](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll#creating-your-site).

[Just the Docs]: https://just-the-docs.github.io/just-the-docs/
[GitHub Pages]: https://docs.github.com/en/pages
[README]: https://github.com/just-the-docs/just-the-docs-template/blob/main/README.md
[Jekyll]: https://jekyllrb.com
[GitHub Pages / Actions workflow]: https://github.blog/changelog/2022-07-27-github-pages-custom-github-actions-workflows-beta/
[use this template]: https://github.com/just-the-docs/just-the-docs-template/generate
[UPS repo]:https://github.com/aferaudo/user_policy_server