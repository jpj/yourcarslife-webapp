Your Car's Life Web Application
===================

Configuration
-------------

The Logback Context Selector needs to be set as well as the location of the configuration directory.

    -Dlogback.ContextSelector=JNDI -Dsolairis.app.config.dir=/usr/local/solairis-app-config

Configure logging in `yourcarslife-logger.properties`

    logger.dir=/usr/local/solairis-app-logs
    logger.root.priority=info
    logger.console.appender=nopAppender

Configure application in `yourcarslife.properties`

    jndi.prefix=
    jawr.debug.on=false
    jawr.config.reload.interval=86400
    db.username=autologger
    db.password=testpass

Expose a JNDI datasource named `jdbc/autologger`. For example

Tomcat

    <Resource name="jdbc/autologger" auth="Container" driverClassName="com.mysql.jdbc.Driver" maxActive="100" maxIdle="30" maxWait="10000" password="testpass" type="javax.sql.DataSource" url="jdbc:mysql://localhost:3306/autologger" username="autologger" validationQuery="SELECT NOW()"/>

Jetty

    <New id="dsAutologger" class="org.eclipse.jetty.plus.jndi.Resource">
      <Arg>jdbc/autologger</Arg>
      <Arg>
        <New class="com.mysql.jdbc.jdbc2.optional.MysqlConnectionPoolDataSource">
          <Set name="Url">jdbc:mysql://localhost:3306/autologger</Set>
          <Set name="User">autologger</Set>
          <Set name="Password">testpass</Set>
        </New>
      </Arg>
    </New>

Run With (New)
===

	JAVA_HOME=~/jdk1.7.0_79 mvn tomcat:run -Dlogback.ContextSelector=JNDI -Dsolairis.app.config.dir=/home/josh/solairis-app-config

TODO
====

Short Term
----------

* Deploy!
* ~~Make `dataSource` configurable: pass in url, name, pass~~
* Move new urls into app cache
* Have a controller generate the app cache (for version)
* Move js/css one-by-one out of WRO, into appcache
** Remove WRO

Medium Term
-----------

* Remove Backbone
* Remove Jquery
* Remove underscore.js

Long Term
---------

* Embed servlet container