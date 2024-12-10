import React from 'react'

export default function ShortTable({data}) {
  return (
    <table className='tbl-container mt-4' style={{ width: '100%' }}>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} style={{ borderBottom: '1px solid #ddd', color:'#fff' }}>
            <td style={{ padding: '12px', fontWeight: 'bold', background:'#de7008', }}>
              {row.label}
            </td>
            <td style={{ padding: '12px', color:'#777' }}>{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
