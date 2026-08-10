let employees = [];
let nextId = 1;

module.exports = {
    getAll: () => employees,
    
    create: (data) => {
        const emp = { id: nextId++, avatarUrl: null, ...data };
        employees.push(emp);
        return emp;
    },
    
    findById: (id) => employees.find(e => e.id === parseInt(id)),
    
    updateAvatar: (id, url) => {
        const emp = employees.find(e => e.id === parseInt(id));
        if (emp) {
            emp.avatarUrl = url;
        }
        return emp;
    }
};