import './NavigateBar.css'
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const formatDate = (dateStamp) => {
    const date = parse(dateStamp, 'yyyyMMdd_HHmmss', new Date())
    const formattedDate = format(date, 'MM/dd/yyyy HH:mm:ss')
    return formattedDate;
}

function NavigateBar({
    apartments,
    handleApartmentChange,
    handleImageChange
}) {

    const [apartment, setApartment] = useState(apartments[0]);

    const selectImageRef = useRef();
    const onApartmentChange = (e) => {
        selectImageRef.current.value = '';
        handleImageChange('');
        const apartment = apartments.find(({ name }) => name === e.target.value);
        setApartment(apartment);
    }

    useEffect(() => {
        if (apartment) {
            const apartmentWithNewImages = apartments.find(({ name }) => name === apartment.name);
            setApartment(apartmentWithNewImages);
        }
    }, [apartments])

    return <div className='form-wrapper'>
        <form className="container">
            <label>
                apartment:
                <select
                    value={apartment.name}
                    onChange={onApartmentChange}>
                    {apartments.map(({ name }) => <option key={name} value={name}>{name}</option>)}
                </select>
            </label>
            <label>
                date:
                <select
                    ref={selectImageRef}
                    onChange={(e)=> handleImageChange(e.target.value, apartment)}
                >
                    <option value=''>choose date</option>
                    <option value='latest'>Latest</option>
                    {apartment.images.map(({ id, date }) => <option key={id} value={id}>{formatDate(date)}</option>)}
                </select>
            </label>
        </form>
    </div>
}

export default NavigateBar;