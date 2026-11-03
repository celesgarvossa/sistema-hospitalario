import {EntitySchema} from 'typeorm';

export const Paciente = new EntitySchema({
    name: 'Paciente',
    tableName: 'Pacientes',

    columns:{
        id: {
            type: 'int',
            primary: true,
            generated: true,
        },
        nombre: {
            type: 'varchar',
            lenght:100,
        },
        apellido:{
            type: 'varchar',
            length: 100,
        },
        documento:{
            type: 'varchar',
            length: 20,
            unique: true,
        },
        fechaNacimiento:{
            name: 'fecha_nacimiento',
            type: 'date',
            nullable: true,
        },
    },
});