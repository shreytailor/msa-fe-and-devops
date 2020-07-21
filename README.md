## Table Of Contents <!-- omit in toc -->
- [DevOps](#devops)
  - [Create React Application](#create-react-application)
  - [Initial Deployment](#initial-deployment)
  - [Create A Build Pipeline](#create-a-build-pipeline)
  - [Create A Release Pipeline](#create-a-release-pipeline)
- [Front-End](#front-end)
<hr>

# DevOps
> This .README file contains the steps taken to complete the DevOps pathway. The commit history of this repository is a bit different from the steps in the tutorial, because in a discontinuity, I had somehow lost all my progress from the Build Pipeline so had to do it again ):

The prerequisites for this project is to have the latest version of Node installed on your computer. 

## Create React Application
Using `npm`, which is the package manager for Node, we first need to install the boilerplate for react using the following command in our terminal.

```
npm install create-react-app
```

After this, we are ready to create our application so make a new repository on GitHub (with a .README), and then make a copy of it on your computer using the basic git commands. You should now be able to finally create a react application by running the following command in your root directory.

```
npx create-react-app my-app --template typescript
```
<hr>

## Initial Deployment
From your Azure Portal, we need to click on **Create a resource** and then select "Web App". Fill out the information of your application like shown in the image below.
![](./images/1.PNG)

After doing everything, click on "Review + Create" and then complete the wizard by clicking on "Create".
<hr>

## Create A Build Pipeline
*A build pipeline is the entity through which you define your automated build steps for your application.* First go to your Azure DevOps portal, and if you haven't already, create a free account using your Microsoft or GitHub account. Create an organization in which you can store many projects, and one or more of your pipelines. In that organization, create a private project with whatever name that suits your project.

Click on "Pipelines" on the left, and then select "Create Pipeline". If you are trying to create a pipeline for your code on GitHub, finish the rest of the process where you must select your repository and also give permissions to edit your code and make commits.

Azure will start us off with a boilerplate (YAML) for our pipeline. For now, we can click on the "Save and Run" button on the top-right corner and make an initial commit on our GitHub project.

![](./images/2.PNG)

Now click on "Pipelines" on the left-side, and go ahead to edit your recently created pipeline. We are now going to edit the default pipeline created for us, in order to suit our application. Remove the starter code under each heading and add the following.

Initially, we are defining the environment variables because we are going to need them often in the configuration process.
```
variables:
    rootDir: 'my-app'
    buildDIr: '$(rootDir)/build'
```

In our pipeline, we are going to be using `npm` so we must install Node.
```
steps:
-   task: NodeTool@0
    inputs:
        versionSpec: '10.x'
    displayName: 'Install Node.js'
```

Before the deployment, we must also build our react application so we use a "script" for that.
```
-   script: |
        cd $(rootDir)
        npm install
        npm run build
        cd ..
    displayName: 'npm install and build'
```

After getting the build, create an archive for it by searching "archive" in the right side-bar. Configure it like below and click "Add".

![](./images/3.PNG)

Thereafter, search for "Publish build artifacts" in the same side-bar, and keep the default setttings. After doing this, you will see more code automatically being added in your YAML file. We have successfully created the Build Pipeline!
<hr>

## Create A Release Pipeline
*This pipeline is responsible for taking our generated build, and then deploying it.* To create it, click on the "Releases" tab under the "Pipelines" menu on the left-side. Choose "Azure App Service deployment" as the template when prompted. You should now have a default release pipeline. We are now going to add an artifact that this pipeline will deploy so to do that click on "Add an artifact".

![](./images/4.png)

Then go to "Tasks" from the top-bar, and configure the settings as shown.

![](./images/5.png)

Go back to "Pipeline" from the top-bar, and then click on the lightning symbol which is a continuous deployment trigger - meaning this pipeline will be triggered everytime that a new build is produced by the build pipeline.

![](./images/6.png)

Everything is now completed so you can go ahead and save this pipeline, as well as create a new manual release from the top-bar to test if everything is working nicely. To test it from the automation's perspective, if you go back to VS Code, change any code and commit those changes, the pipeline will automatically run and the published application would be a reflection of the updated code.
<hr>

# Front-End