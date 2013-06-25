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
