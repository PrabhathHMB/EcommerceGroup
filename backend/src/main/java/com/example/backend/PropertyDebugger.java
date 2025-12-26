package com.example.backend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class PropertyDebugger implements CommandLineRunner {

    @Value("${spring.data.mongodb.uri:NOT_SET}")
    private String mongoUri;

    @Value("${spring.data.mongodb.database:NOT_SET}")
    private String mongoDb;

    @Value("${server.port:NOT_SET}")
    private String serverPort;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("========================================");
        System.out.println("DEBUG PROPS:");
        System.out.println("spring.data.mongodb.uri: " + mongoUri);
        System.out.println("spring.data.mongodb.database: " + mongoDb);
        System.out.println("server.port: " + serverPort);
        System.out.println("========================================");
    }
}
