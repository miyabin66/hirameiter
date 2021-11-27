import useName from '~/hooks/useName'
import style from '~/styles/name.module.scss'

const name = (): JSX.Element => {
  const {
    isEmpty,
    isOver,
    isFirstEmpty,
    nameInput,
    validation,
    saveName,
  } = useName()

  return (
    <div className={style.name}>
      <p className={style.name__text}>
        トレーニングしてる奴の名前を入れてくれよな！ちなみに10文字までしか認めねーぞ
      </p>
      <div className={style.name__wrap}>
        <input
          type="text"
          className={style.name__input}
          ref={nameInput}
          onChange={validation}
        ></input>
        <button
          className={style.name__button}
          onClick={saveName}
          data-isempty={isEmpty}
          data-islimitover={isOver}
          data-isfirstempty={isFirstEmpty}
        >
          次へ
        </button>
      </div>
      <p className={style.name__error__empty} data-isempty={isEmpty}>
        何も入力してねーじゃねえか！
        <br />
        ボタン押させねーぞ！
      </p>
      <p className={style.name__error__over} data-isover={isOver}>
        おいおい10文字以内にしろよ！
        <br />
        そうしねーとボタン隠したままにするぞ！
      </p>
    </div>
  )
}

export default name
