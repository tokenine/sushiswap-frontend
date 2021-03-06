import React from 'react'
import {
  StyledAdPlaneBanner,
  AdPlaneBannerProgressBarActive,
  AdPlaneBannerProgressBar,
  AdPlaneBannerPrice,
  AdPlaneBannerHeader,
  AdPlaneBannerText,
} from './styled'

interface IProps {
  price?: string
  progress?: string
}

const AdPlaneBanner: React.FC<IProps> = ({
  price = 'Locked',
  progress = '0%',
}) => {
  return (
    <StyledAdPlaneBanner>
      <AdPlaneBannerHeader>
        <AdPlaneBannerText>
          <span>REFERRAL</span>BONUS POOL
        </AdPlaneBannerText>
        <AdPlaneBannerPrice>
          {price === 'Locked' ? price : `$${price}`}
        </AdPlaneBannerPrice>
      </AdPlaneBannerHeader>
      <AdPlaneBannerProgressBar isLock={false}>
        <AdPlaneBannerProgressBarActive progress={progress} />
      </AdPlaneBannerProgressBar>
    </StyledAdPlaneBanner>
  )
}

export default AdPlaneBanner
