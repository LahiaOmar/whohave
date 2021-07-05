import React from 'react'

import { Grid, Stepper as StepperUI, Step, StepLabel, Hidden, Button } from '@material-ui/core'

const Stepper = ({
  onNext,
  onBack,
  onFinish,
  activeStep,
  stepsComplete,
  labels,
  children,
}) => {

  return (
    <Grid container spacing={2} xs={12} justify="center">
      <Grid item xs={12}>
        <Hidden smUp>
          <StepperUI>
            <Step completed={stepsComplete[activeStep]}>
              <StepLabel icon={activeStep + 1}> {labels[activeStep]} </StepLabel>
            </Step>
          </StepperUI>
        </Hidden>
        <Hidden xsDown>
          <StepperUI activeStep={activeStep}>
            {
              labels.map(stepLabel =>
                <Step>
                  <StepLabel> {stepLabel} </StepLabel>
                </Step>
              )
            }
          </StepperUI>
        </Hidden>
      </Grid>
      {
        children.map((child, index) => (
          React.cloneElement(child, {
            stepIndex: index,
            activeStep: activeStep
          })
        ))
      }
      <Grid item container xs={12} className="stepper-button" justify="center" spacing={2} >
        {
          (activeStep > 0)
          &&
          <Grid item xs={4}>
            <Button
              onClick={() => onBack()}
              fullWidth
              variant="contained"
              color="primary">
              BACK
						</Button>
          </Grid>
        }
        {
          (activeStep >= 0 && activeStep < children.length - 1)
          &&
          <Grid item xs={4}>
            <Button
              onClick={() => onNext()}
              fullWidth
              variant="contained"
              color="primary">
              NEXT
						</Button>
          </Grid>
        }
        {
          (activeStep === children.length - 1)
          &&
          <Grid item xs={4}>
            <Button
              onClick={() => onFinish()}
              fullWidth
              variant="contained"
              color="primary">
              FINISH
						</Button>
          </Grid>
        }
      </Grid>
    </Grid>
  )
}

export default Stepper