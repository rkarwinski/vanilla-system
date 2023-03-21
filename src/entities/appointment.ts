export interface AppointmentsProps {
    customer: string,
    startsAt: Date,
    endsAt: Date,
}

export class Appointment {
    private props: AppointmentsProps; 

    get customer () {
       return  this.props.customer; 
    }

    get startsAt () {
        return  this.props.startsAt; 
    }

    get endsAt () {
        return  this.props.endsAt; 
    }

    constructor(props: AppointmentsProps) {
        const { startsAt, endsAt } = props;

        if (startsAt <= new Date()) {
            throw new Error("Invalid Start Date");
        }
        
        if (endsAt <= startsAt) {
            throw new Error("Invalid Date");
        }

        this.props = props; 
    }
}