![Logo](./header-logo.png)

# Recreating Container Instances

This documentation will go through the steps necessary to recreate container instances for a set of static websites.

## Static websites and GitHub

This documentation is not primarily concerned with the process of creating static websites;
however, it is necessary to have something to display so that you can confirm the containers are working correctly.
With that goal in mind, you should create six unique static sites using HTML, CSS,
and JavaScript before you begin working with containers.
Generative AI is a good tool to use when building simple sites for this goal.

### Dockerfiles and Docker Compose

Alongside your static websites, you will also need Dockerfiles and a Docker Compose file in your repository.
This will enable you to easily create containers for your websites later once you have an Ubuntu VM.
For now, follow these steps on your local machine:

1. Create a single file named `Dockerfile` (no extension) within only the first static website folder.
This file should have the below contents:

    ```dockerfile
    FROM nginx:stable-alpine
    COPY . /usr/share/nginx/html
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]
    ```

2. Create a single YAML file named `docker-compose.yml` in the root folder of your repository.
This file should have the below contents:

    ```yaml
    version: '3.8'

    services:
        site1-copy1:
            image: site1-nginx-container
            ports:
            - "8081:80"

        site1-copy2:
            image: site1-nginx-container
            ports:
            - "8082:80"

        site1-copy3:
            image: site1-nginx-container
            ports:
            - "8083:80"

        site1-copy4:
            image: site1-nginx-container
            ports:
            - "8084:80"

        site1-copy5:
            image: site1-nginx-container
            ports:
            - "8085:80"
        
        site2:
            image: site1-nginx-container
            ports:
            - "8086:80"
            volumes:
            - ./static-site-2:/usr/share/nginx/html:ro

        site3:
            image: site1-nginx-container
            ports:
            - "8087:80"
            volumes:
            - ./static-site-3:/usr/share/nginx/html:ro

        site4:
            image: site1-nginx-container
            ports:
            - "8088:80"
            volumes:
            - ./static-site-4:/usr/share/nginx/html:ro

        site5:
            image: site1-nginx-container
            ports:
            - "8089:80"
            volumes:
            - ./static-site-5:/usr/share/nginx/html:ro

        site6:
            image: site1-nginx-container
            ports:
            - "8090:80"
            volumes:
            - ./static-site-6:/usr/share/nginx/html:ro
    ```

Your repository structure should look similar to this once you have finished the above steps:

```text
project-root/
├── 📄 docker-compose.yml
├── 📁 static-site-1/
│   ├── 📄 index.html
│   ├── 📄 Dockerfile (only within static-site-1)
│   ├── 📁 css
│   │   └── 📄 style.css
│   └── 📁 js
│       └── 📄 main.js
├── 📁 static-site-2/
├── 📁 static-site-3/
├── 📁 static-site-4/
├── 📁 static-site-5/
└── 📁 static-site-6/
```

This repository should be committed to a remote GitHub repository so that you can pull these files onto your Ubuntu server instance later.

## Create an Ubuntu instance

1. Navigate to the [AWS Management Console](https://console.aws.amazon.com/).
Sign in or create an account to enter the management console.

2. Click on "All Services" on the left navigaton panel.

    ![All Services](./all-services.png)

3. Under the *Compute* category of services, select **EC2**.

4. On the left panel, select **Instances**.

    ![Select Instances](./select-instances.png)

5. Click "Launch Instances" in the upper right-hand corner.

6. Name the instance. A good choice is "Ubuntu_Server-Containers".

7. Select Ubuntu as the Amazon Machine Image (AMI).

8. In the "Key pair (login)" card, click to **Create a new key pair**.
It can be named something similar to "Ubuntu-containers-key".
Once the key has been created, make sure you know where you can access it.
One place is to leave it is in the same repository as your static sites,
but make sure to add a .gitignore so that the key is not committed to GitHub.

9. Ensure your summary card shows the correct AMI to launch. Launch the instance.

    ![Launch Instance](./launch-instance.png)

10. Once you have made it to the instance dashboard,
you need to set up the security settings to enable incoming TCP requests.
Start by navigating to the security tab and clicking on the security groups link.

    ![Security Tab](./security-tab.png)

    Next, click to **Edit inbound rules** on the right side of your screen.
    There should already be a rule allowing incoming SSH connections.
    Add a new *Custom TCP* rule that allows incoming connections from any IPv4 address on the port range **8080-8090**.

    ![Editing Inbound Rules](./edit-inbound-rules.png)

10. You can now use the "Connect" button on the top right of your screen to connect to your Ubuntu machine via SSH.

## Pulling repository files from GitHub

The first task to do on your new VM is to pull the repository files you created earlier.
Ensure you are in the `home` directory of your Ubuntu machine (this is where you start when you first log in to the server).
Then, clone your repository from GitHub into this folder.
You can use the `cd` command to change into your project root directory.

## Installing Docker and Docker Compose on VM

The below steps should be done from your Ubuntu VM.

1. Add Docker's official GPG key:

    ```bash
    sudo apt-get update
    sudo apt-get install ca-certificates curl
    sudo install -m 0755 -d /etc/apt/keyrings
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc
    ```

2. Add the repository to Apt sources:

    ```bash
    echo \
        "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
        $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update
    ```

3. Install the Docker engine:

    ```bash
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    ```

4. Set up running Docker without Sudo:

    ```bash
    sudo groupadd docker
    sudo gpasswd -a $USER docker
    newgrp docker
    ```

5. Install Docker Compose:

    ```bash
    sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    docker-compose --version
    ```

## Building container instances

These steps build all 10 container instances (5 copies of the initial container, 5 unique containers).
You should run these commands by starting at the project root directory.

1. Build the initial container image:

    ```bash
    cd static-site-1
    docker build -t site1-nginx-container .
    cd ..
    ```

2. Use Docker Compose to spin up the 10 other services:

    ```bash
    docker compose up -d
    ```

All 10 services are now running via Docker Compose!
The 5 copies of the inital static site can be accessed from ports 8081-8085.
The 5 unique sites can be accessed from ports 8086-8090.
To shut these services back down, run the following command:

```bash
docker compose down
```
