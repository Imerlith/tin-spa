import React from 'react';


class PricesComponent extends React.Component {
    render() {
        return (
            <div class ="pr-table">
                <table >
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
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
                   </table>
            </div>
        );
    };
}

export default PricesComponent;