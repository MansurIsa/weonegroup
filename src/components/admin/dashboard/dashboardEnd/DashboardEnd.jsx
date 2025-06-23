import React from 'react'

const DashboardEnd = () => {
    return (
        <div className='admin_container'>
            <table>
                <thead>
                    <tr>
                        <th>Müştəri Adı</th>
                        <th>Kodu</th>
                        <th>Borcu</th>
                        <th>Əlaqə</th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td>
                            Elçin Quliyev
                        </td>
                        <td>
                            504
                        </td>
                        <td>
                            350 ₼
                        </td>
                        <td>
                            050 xxx xx xx
                        </td>


                    </tr>

                </tbody>
            </table>
        </div>
    )
}

export default DashboardEnd