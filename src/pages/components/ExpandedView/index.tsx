/*
 * @Author: lumeifeng
 * @Date: 2023-05-08 09:46:48
 * @LastEditors: lumeifeng
 * @LastEditTime: 2023-05-08 09:59:14
 * @Description: TODO
 */
import { ExpandedViewType } from '../../interface'
import styles from './index.less'

const defaultProps = {
	comData: {},
}

const ExpandedView = (props: ExpandedViewType = defaultProps) => {
	const { comData } = props
	const { workshopNum = 0, equNum = 0, lowEfficiencyEquNum = 0 } = comData

	return (
		<div className={styles.expandContainer}>
			<div className={styles.expandItem}>
				<span className={styles.expandItemLable}>设备组数</span>
				<span className={styles.expandItemValue}>{workshopNum}</span>
			</div>
			<div className={styles.expandItem}>
				<span className={styles.expandItemLable}>设备数</span>
				<span className={styles.expandItemValue}>{equNum}</span>
			</div>
			<div className={styles.expandItem}>
				<span className={styles.expandItemLable}>低能效设备数</span>
				<span
					className={`${styles.expandItemValue} ${styles.expandItemStrong}`}
				>
					{lowEfficiencyEquNum}
				</span>
			</div>
		</div>
	)
}

export default ExpandedView
