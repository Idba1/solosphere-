import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JobCard from '../Job/JobCard';

const TabCategory = () => {
    return (
        <div>
            <Tabs>
                <div className='container mx-auto px-6 py-10'>
                    <div className='flex items-center justify-center'>
                        <TabList>
                            <Tab>Web Development</Tab>
                            <Tab>Digital Marketing</Tab>
                            <Tab>Graphic Design</Tab>
                            <Tab>Project Manager</Tab>
                        </TabList>
                    </div>

                    <TabPanel>
                        <h2>
                            <JobCard></JobCard>
                        </h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>
                            <JobCard></JobCard>
                        </h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>
                            <JobCard></JobCard>
                        </h2>
                    </TabPanel>
                    <TabPanel>
                        <h2 className='flex gap-5'>
                            <JobCard></JobCard>
                            <JobCard></JobCard>
                        </h2>
                    </TabPanel>
                </div>
            </Tabs>
        </div>
    );
};

export default TabCategory;