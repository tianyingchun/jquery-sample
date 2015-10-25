jquery-sample
==========
the samle solution based on jquery components (CMD) for pc platform
----------
- The demo project solution for pc platform based on jquery opensource ui libraray.

The usage commandline
----------

- 首先下载Nodejs 官方包安装好，下载地址: [nodejs](https://nodejs.org/en/)

- 安装NODEJS 国内的镜像，国外的网络部好安装NODE 包会比较慢 运行如下命令在终端
  $ npm install -g cnpm --registry=https://registry.npm.taobao.org

- 全局安装Grunt 命令 运行如下命令在终端
  $ cnpm install grunt-cli -g

- clone 当前的项目熟悉基本的GIT命令行， 运行如下命令
  $ git clone https://github.com/tianyingchun/jquery-sample.git

- cd 到CLONE 好得代码文件夹如： cd ~/Documents/workspace/jquery-sample

- 运行安装项目依赖包 执行如下命令
  $ cnpm install  会自动安装项目依赖文件夹(会再当前目录产生文件夹 node_modules)

- 启动本地WEB 服务器（默认端口未4001）其实就喝JAVA tomcat 的 8080 一样只是一个WEB 服务器而已， 运行命令
  $ grunt server

- 启动开发自动编译调试服务器（代码更改会自动编译）
  $ grunt hot:docs（注意这里的docs 代表项目名称)

- 下载安装CHROME 浏览器，打开地址: http://localhost:4001/docs




