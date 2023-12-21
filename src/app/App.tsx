import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {I18nProvider} from '../knowledgebase/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from '../knowledgebase/layout/core'
import {MasterInit} from '../knowledgebase/layout/MasterInit'
import {AuthInit} from './modules/auth'
import {ThemeModeProvider} from '../knowledgebase/partials'

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <ThemeModeProvider>
            <AuthInit>
              <Outlet />
              <MasterInit />
            </AuthInit>
          </ThemeModeProvider>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  )
}

export {App}
