import e from "cors";
import React from "react";

const RateChart = ({ rates }) => {
    const rateData = [
        { name: 1, value: rates.filter(rate => rate.rate === 1).length },
        { name: 2, value: rates.filter(rate => rate.rate === 2).length },
        { name: 3, value: rates.filter(rate => rate.rate === 3).length },
        { name: 4, value: rates.filter(rate => rate.rate === 4).length },
        { name: 5, value: rates.filter(rate => rate.rate === 5).length }
    ];
    return (
        <div className="rate-chart">
            <div className="rate-chart__container">
                {rateData.slice().reverse().map((rate, index) => (
                    <div key={index} className="rate-chart__item" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                        <span style={{ marginLeft: `10px`, opacity: `0.8`, fontSize: `14.5px` }}>{rate.name}</span>
                        <div className="rate-chart__bar" style={{ width: '100%', height: '9px', backgroundColor: 'whitesmoke', position: 'relative', borderRadius: '15px', overflow: 'hidden' }}>
                            <div style={{ width: `${(rate.value * 100) / rates.length}%`, height: '100%', backgroundColor: 'orange', position: 'absolute', top: 0, left: 0, borderRadius: '15px' }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default RateChart;