import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { closePurchaseUpdateModalFunc } from '../../../redux/slices/admin/purchaseSlices'
import { deletePurchaseComp, getPurchaseListList } from '../../../actions/purchaseAction/purchaseAction'
import { deleteSalesComp, getSalesList } from '../../../actions/salesAction/salesAction'
import { closeSaleUpdateModalFunc } from '../../../redux/slices/admin/salesSlice'

const SaleDeleteModalComp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { saleDeleteId } = useSelector(state => state.sales)
    const handleSalesDelete = async () => {
        await dispatch(deleteSalesComp(saleDeleteId, navigate));
        await dispatch(getSalesList()); // Silindikdən sonra düzgün list alınır
        //   dispatch(closeProductsDeleteModalFunc()); // Modal bağlanır
    };
    return (
        <div className="modal_overlay" onClick={() => dispatch(closeSaleUpdateModalFunc())}>
            <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                <div className="modal_inner_container">
                    <div className="warehouse_content">
                        <h2>Silmək istədiyinizdən əminsiniz?</h2>
                    </div>

                </div>
                <div className='modal_yes_no_btns'>
                    <button onClick={handleSalesDelete}>Bəli</button>
                    <button onClick={() => dispatch(closeSaleUpdateModalFunc())}>Xeyr</button>
                </div>
            </div>
        </div>
    )
}

export default SaleDeleteModalComp