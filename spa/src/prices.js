import React from 'react';


class PricesComponent extends React.Component {
    render() {
        return (
            <div className="pr-table">
                <table >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Hour on Station</td>
                            <td>120 USD</td>
                        </tr>
                        <tr>
                            <td>Pizza</td>
                            <td>3 USD</td>
                        </tr>
                        <tr>
                            <td>Hour on PS</td>
                            <td>30 USD</td>
                        </tr>
                        <tr>
                            <td>Hour on XBOX</td>
                            <td>40 USD</td>
                        </tr>
                        <tr>
                            <td>JUICE</td>
                            <td>20 USD</td>
                        </tr>
                        <tr>
                            <td>Water</td>
                            <td>2 USD</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };
}

export default PricesComponent;