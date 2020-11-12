export class Turno {
    id: string;
    nombre_paciente: string;
    apellido_paciente: string;
    time: number;
    fechaMostrar: string;
    correo_profesional: string;
    correo_paciente: string;
    estado: string = "pendiente";
    nombre_profesional: string;
    apellido_profesional: string;
    resenia: any;
    especialidad: string;   // AGREGADO
    encuesta: {
        lugar: string,
        atencion: string,
        recomienda: boolean,
    };
}
