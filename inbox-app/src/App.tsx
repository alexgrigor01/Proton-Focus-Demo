import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { InboxToolbar } from './components/InboxToolbar';
import { EmailList } from './components/EmailList';
import { RegularEmailList } from './components/RegularEmailList';
import { BundleView } from './components/BundleView';
import { EmailDetailView } from './components/EmailDetailView';
import { AppSwitcher } from './components/AppSwitcher';
import type { BundleId } from './data/bundles';
import type { SelectedEmail } from './types';

type FilterTab = 'All' | 'Read' | 'Unread' | 'Has attachments';
type InboxView = 'Regular' | 'Focus';

export default function App() {
  const [activeView, setActiveView] = useState<InboxView>('Focus');
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All');
  const [currentBundle, setCurrentBundle] = useState<BundleId | null>(null);
  const [selectedEmail, setSelectedEmail] = useState<SelectedEmail | null>(null);

  function handleViewChange(view: InboxView) {
    setActiveView(view);
    if (view === 'Regular') setCurrentBundle(null);
  }

  function handleEmailClick(email: SelectedEmail) {
    setSelectedEmail(email);
  }

  function handleEmailClose() {
    setSelectedEmail(null);
  }

  return (
    <div className="bg-pm-bg flex items-start h-screen w-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 h-full min-w-0">

        {selectedEmail ? (
          /* ── Email detail view (has its own header row) ── */
          <div className="flex flex-1 min-h-0 items-start">
            <div className="bg-pm-bg-dark border-r border-pm-border flex flex-col flex-1 h-full min-w-0 overflow-hidden">
              <EmailDetailView email={selectedEmail} onClose={handleEmailClose} />
            </div>
            <AppSwitcher />
          </div>
        ) : (
          /* ── Normal inbox / bundle view ── */
          <>
            <Header />
            <div className="flex flex-1 min-h-0 items-start">
              <div className="bg-pm-bg-dark border-r border-pm-border flex flex-col flex-1 h-full min-w-0 rounded-tr-lg overflow-hidden">

                {currentBundle ? (
                  /* ── Bundle detail view ── */
                  <BundleView
                    bundleId={currentBundle}
                    onBack={() => setCurrentBundle(null)}
                    activeView={activeView}
                    activeFilter={activeFilter}
                    onViewChange={handleViewChange}
                    onFilterChange={setActiveFilter}
                    onEmailClick={handleEmailClick}
                  />
                ) : (
                  /* ── Inbox view (Focus or Regular) ── */
                  <>
                    <InboxToolbar
                      activeView={activeView}
                      activeFilter={activeFilter}
                      onViewChange={handleViewChange}
                      onFilterChange={setActiveFilter}
                    />
                    <div className="flex-1 overflow-y-auto">
                      {activeView === 'Regular' ? (
                        <RegularEmailList
                          onEmailClick={handleEmailClick}
                          activeFilter={activeFilter}
                        />
                      ) : (
                        <EmailList
                          onViewBundle={setCurrentBundle}
                          onEmailClick={handleEmailClick}
                          activeFilter={activeFilter}
                        />
                      )}
                    </div>
                  </>
                )}

              </div>
              <AppSwitcher />
            </div>
          </>
        )}

      </div>
    </div>
  );
}
