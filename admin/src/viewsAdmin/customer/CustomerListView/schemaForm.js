export const schemaCreateUserForm = {
    title: "Create new user",
    description: "...",
    type: "object",
    required: ["lastName", "email", "password", "roles"],
    properties: {
        firstName: { type: "string", title: "First name" },
        lastName: { type: "string", title: "Last name" },
        phone: { type: "string", title: "Phone number" },
        email: { type: "string", title: "Email", format: "email" },
        roles: {
            type: "array",
            title: "Roles",
            items: {
                type: "string",
                enum: ['admin', 'support', 'customer'],
                default: "customer"
            },
        },
        password: { type: "string", title: "Password", format: "password" },
    }
};

export const uiSchemaCreateUserForm = {

};