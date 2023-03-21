import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository";
import { CreateAppointment } from "./create-appointment";

describe('Create appointment', () => {
    it('should be able to create an appointment', () => {
        const appointmentsRepository = new InMemoryAppointmentsRepository;
        const createAppointment = new CreateAppointment(appointmentsRepository);

        const startsAt = new Date();
        const endsAt = new Date();

        startsAt.setDate(startsAt.getDate() + 1);
        endsAt.setDate(endsAt.getDate() + 2);

        expect(createAppointment.execute({
            customer: 'Ted Mosby', 
            startsAt,
            endsAt
        })).resolves.toBeInstanceOf(Appointment);
    });

    it('should not be able to create an appointment whit overlapping dates', async () => {
        const appointmentsRepository = new InMemoryAppointmentsRepository;
        const createAppointment = new CreateAppointment(appointmentsRepository);

        const startsAt = new Date();
        const endsAt = new Date();

        startsAt.setDate(startsAt.getDate() + 1);
        endsAt.setDate(endsAt.getDate() + 3);

        await createAppointment.execute({
            customer: 'Ted Mosby', 
            startsAt,
            endsAt
        });

        const startsAt2 = new Date();
        const endsAt2 = new Date();

        startsAt2.setDate(startsAt2.getDate());
        endsAt2.setDate(endsAt2.getDate() + 2);

        expect(createAppointment.execute({
            customer: 'Marshal', 
            startsAt: startsAt2,
            endsAt: endsAt2
        })).rejects.toBeInstanceOf(Error);
    });
});