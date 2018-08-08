import * as React from "react"

import { AlertDefault } from "app/renderer/ui/components/alert"
import { CardNavigation } from "app/renderer/ui/components/card"
import { InputBig } from "app/renderer/ui/components/input"

const styles = require("./style.scss")

export interface Iprops {
  className?: string
  errorMessage?: string
  inputValue: string
  nextStep: () => void
  onChangeInput?: (ev: React.ChangeEvent) => void
  previousStep: () => void
}

/**
 * Step walled seed confirmation UI component
 *
 * @export
 * @class WalletSeedConfirmation
 * @extends {React.Component<Iprops>}
 */

export default class WalletSeedConfirmation extends React.Component<Iprops> {
  /** render */
  // tslint:disable-next-line:prefer-function-over-method
  public render() {
    return (
      <>
        <CardNavigation
          className={this.props.className}
          title="Wallet seed confirmation"
          previousStep={this.props.previousStep}
          nextStep={this.props.nextStep}
        >
          <p>Please type here your seed to confirm it:</p>
          <InputBig value={this.props.inputValue} onChange={this.props.onChangeInput} />
          <p className={styles.error}>{this.props.errorMessage}</p>
        </CardNavigation>
        <AlertDefault className={styles["alert-grid"]}>
          <div className={styles.alert}>
            <p>Your seed is important!</p>
            <p>If you lose your seed, your coins will be permanently lost.</p>
            <p>To confirm that you have properly saved your seed, please retype it here.</p>
          </div>
        </AlertDefault>
      </>
    )
  }
}