import { expect, test } from 'vitest'
import { Appointment } from './appointment'

test('create an appointment', () => {
    const startsAt = new Date();
    const endsAt = new Date();

    startsAt.setDate(startsAt.getDate() + 1);
    endsAt.setDate(endsAt.getDate() + 2);

    const appointment = new Appointment({
        customer: 'Ted Mosby', 
        startsAt, 
        endsAt
    })

    expect(appointment).toBeInstanceOf(Appointment);
    expect(appointment.customer).toEqual('Ted Mosby');

});

test('cannot create an appointment whit end date before start date', () => {
    const startsAt = new Date();
    const endsAt = new Date();

    startsAt.setDate(startsAt.getDate() + 2);
    endsAt.setDate(endsAt.getDate() + 1);

    expect(() => {
        return new Appointment({
            customer: 'Ted Mosby', 
            startsAt, 
            endsAt
        })
    }).toThrow();
});

test('cannot create an appointment whit start date before now', () => {
    const startsAt = new Date();
    const endsAt = new Date();

    startsAt.setDate(startsAt.getDate() - 1);
    endsAt.setDate(endsAt.getDate() - 3);

    expect(() => {
        return new Appointment({
            customer: 'Ted Mosby', 
            startsAt, 
            endsAt
        })
    }).toThrow();
});