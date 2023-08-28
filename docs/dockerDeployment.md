---
title: Docker Deployment
layout: default
nav_order: 2
---

## Docker-based deployment
To run the ups within a Docker container, follow these steps:

1. Make sure you are in the "user_policy_server" directory.

2. Prior to running the Docker container, ensure you have configured the necessary environment variables in the .env file.

3. Execute the following command:

```bash
docker-compose --env-file .my-env up -d
```
This command initiates the containerized ups service in the background.

Please be aware that proper configuration of the .my-env file is crucial for the system to function correctly. This file houses the essential environment variables that the ups container relies on. Make sure you've accurately configured this file before proceeding with the docker-compose command. An example of this file can be found [here](https://github.com/aferaudo/user_policy_server/blob/master/.my-env.example).