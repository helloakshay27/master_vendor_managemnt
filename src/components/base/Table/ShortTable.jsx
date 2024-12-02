import React from 'react'

export default function ShortTable({data}) {
  return (
    <table className='tbl-container mt-4 ' style={{ width: '100%', border:'1px solid #ddd' }}>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
            <td style={{ padding: '8px', fontWeight: 'bold', background:'#de7008' }}>
              {row.label}
            </td>
            <td style={{ padding: '8px' }}>{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
