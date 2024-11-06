import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JobCard from '../Job/JobCard';

const TabCategory = ({ jobs }) => {
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
                        <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                            {
                                jobs.filter(j => j.category === 'Web Development').map(job => (
                                    <JobCard key={job._id} job={job}></JobCard>
                                ))
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                            {
                                jobs.filter(j => j.category === 'Digital Marketing').map(job => (
                                    <JobCard key={job._id} job={job}></JobCard>
                                ))
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                            {
                                jobs.filter(j => j.category === 'Graphic Design').map(job => (
                                    <JobCard key={job._id} job={job}></JobCard>
                                ))
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                            {
                                jobs.filter(j => j.category === 'Project Manager').map(job => (
                                    <JobCard key={job._id} job={job}></JobCard>
                                ))
                            }
                        </div>
                    </TabPanel>
                </div>
            </Tabs>
        </div>
    );
};

export default TabCategory;