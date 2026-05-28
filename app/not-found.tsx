// not-found.tsx

import styles from "./not-found.module.css"

const NotFound = () => {

   return (
          <div className={styles.container}>
      <dl>
        <dt className={styles.title}>ページが見つかりませんでした</dt>
        <dd className={styles.text}>
          あなたがアクセスしようとしたページは存在しません。
          <br />
          URLを再度ご確認ください。
        </dd>
      </dl>
    </div>
   )
}

export default NotFound