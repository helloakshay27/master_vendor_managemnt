import React from 'react'
import Table from '../../base/Table/Table';
import ShowIcon from '../Icon/ShowIcon';
import { documentColumns, documentData } from '../../../constant/data';
import EyeIcon from '../Icon/EyeIcon';

export default function DocumentAttachmentTable({handleDocumentModalShow}) {
    return (
        <Table
          columns={documentColumns}
          data={documentData}
          onActionClick={handleDocumentModalShow}
          // @ts-ignore
          actionIcon={<EyeIcon />}
        />
      )
}
